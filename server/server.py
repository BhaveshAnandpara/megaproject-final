from flask import Flask, request, jsonify
from model import predict , saveEmotionData
from flask_cors import CORS
from pydub import AudioSegment
AudioSegment.ffmpeg = "C:/Users/bhave/Downloads/ffmpeg-6.1/ffmpeg-6.1"
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from keras.models import load_model
from keras.preprocessing.image import img_to_array
import cv2
import numpy as np
import os
from collections import Counter
from firebase_admin import storage


app = Flask(__name__)

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
bucket = storage.bucket('login-auth-a4895.appspot.com')

db = firestore.client()

root_directory = os.path.dirname(os.path.abspath(__file__))
snapshot_folder = os.path.join(root_directory, 'snapshot')
uploads_folder = os.path.join(root_directory, 'uploads')
os.makedirs(snapshot_folder, exist_ok=True)
os.makedirs(uploads_folder, exist_ok=True)

CORS(app, resources={r"/predict": {"origins": "https://megaproject-final.vercel.app"}})


face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
classifier = load_model('model.h5')
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']


@app.route('/', methods=['GET'])
def home():
    return "Hello world!"


@app.route('/emotionData', methods=['GET'])
def emotion():
    data = []
    users_ref = db.collection('emotion')
    docs = users_ref.get()

    data = []
    for doc in docs:
        data.append(doc.to_dict()['emotion'])  # Convert Firestore document to Python dictionary

    # Count occurrences of each element in the list
    counts = Counter(data)

    # Create a mapping for the emotion names
    emotion_mapping = {
        'Happy': 'Happy',
        'Angry': 'Angry',
        'Disgust': 'Disgust',
        'Fear': 'Fear',
        'Neutral': 'Neutral',
        'Sad': 'Sad',
        'Surprise': 'Surprise'
    }

    # Define the order of emotions
    emotion_order = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

    # Create a list of emotions with their counts
    result = [["Total", str(len(data))]]  # Total count
    for emotion in emotion_order:
        count = counts.get(emotion_mapping.get(emotion), 0)
        result.append([emotion, count])

    # Add CORS headers to the response
    response = jsonify(result)
    # Add CORS headers to the response 
    response.headers.add('Access-Control-Allow-Origin',  'https://megaproject-final.vercel.app')
    return response


@app.route('/predictEmotion', methods=['POST'])
def get_emotion_prediction():

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})
    
    snapshot = request.files['image']
    email = request.form.get('email')
    
    if snapshot.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the file
    file_path = os.path.join(snapshot_folder, snapshot.filename)
    snapshot.save(file_path)

    # Read the saved file for image processing
    image = cv2.imread(file_path)
    
    labels = []
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray)


    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

        if np.sum([roi_gray]) != 0:
            roi = roi_gray.astype('float') / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)

            prediction = classifier.predict(roi)[0]
            label = emotion_labels[prediction.argmax()]
            labels.append({'label': label, 'position': (x, y)})
        else:
             labels.append({'label': 'No Faces', 'position': (30, 80)})


    if( labels == [] ):
        labels.append({'label': 'No Faces', 'position': (30, 80)})

    saveEmotionData(labels , snapshot.filename , email , db)
    os.remove(file_path)
    print(labels)

    # Add CORS headers to the response
    response = jsonify({'emotion': labels[0]['label']})
    # Add CORS headers to the response 
    response.headers.add('Access-Control-Allow-Origin',  'https://megaproject-final.vercel.app')
    return response


@app.route('/predict', methods=['POST'])
def get_prediction():

    if 'audio_file' not in request.files:
        return jsonify({'error': 'No audio file provided'})

    audio_file = request.files['audio_file']
    que = request.form.get('que')
    email = request.form.get('email')

    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Example: Save the file to a folder named 'uploads'

    # audio_file.save('uploads/' + audio_file.filename)
    # file_path = "uploads/" + audio_file.filename

    file_path = os.path.join(uploads_folder, audio_file.filename)
    audio_file.save(file_path)

    # destination_blob_name = 'images/audio_file.filename'

    # Upload the local file to Firebase Storage
    # blob = bucket.blob(destination_blob_name)
    # blob.upload_from_filename(file_path)


    # Check if the file is an MP3 and convert it to WAV
    if audio_file.filename.lower().endswith('.mp3'):
        audio = AudioSegment.from_mp3('uploads/' + audio_file.filename)
        wav_file_path = 'uploads/' + audio_file.filename.replace('.mp3', '.wav')
        audio.export(wav_file_path, format='wav')
        file_path = wav_file_path  # Update the file path to the converted WAV file

    prediction = predict( file_path  , db , que , email )

    # Add CORS headers to the response
    response = jsonify({'prediction': prediction})
    # Add CORS headers to the response 
    response.headers.add('Access-Control-Allow-Origin', 'https://megaproject-final.vercel.app')
    return response


if __name__ == '__main__':
    app.run()
