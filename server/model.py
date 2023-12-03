from xgboost import XGBClassifier
import joblib
from sklearn.feature_extraction.text import CountVectorizer
import speech_recognition as sr
from pydub import AudioSegment
import soundfile as sf
from uuid import uuid4
import os

# Create a Recognizer instance
recognizer = sr.Recognizer()


# Load the saved model
loaded_model = joblib.load('xgb_model.pkl')
loaded_vectorizer = joblib.load('fitted_vectorizer.pkl')



def saveEmotionData( labels , filename , que , count , email , db ):
    _id = str(count) + '-' + email + '-' + filename 
    db.collection('emotion').document( _id ).set({ "emotion" :  labels[0]['label'] , "que" : que })


# Initializing a CountVectorizer to convert text into numerical features, limiting to 100 features

def predict(filename , db , que , email):

    audio = AudioSegment.from_file(filename)
    audio.export('output.wav', format='wav')

    data, samplerate = sf.read(filename)

    # Convert audio to text
    with sr.AudioFile('output.wav') as source:
        audio_data = recognizer.record(source)
        input_text = recognizer.recognize_google(audio_data)


    text_transformed = loaded_vectorizer.transform([input_text])
    text_array = text_transformed.toarray()
    
    prediction = loaded_model.predict(text_array)

    label_mapping = {
        0 : 'depressed',
        1 : 'non-depressed',
        2 : 'suicidal',
        3 : 'non-suicidal',
        4 : 'stress',
        5 : 'no stress'
    }
    

    queArr = [
        "Tell me a bit about yourself ?",
        "What is the problem you are suffering from currently ?",
        "How would you describe your sleep schedule?",
    ]

    for i in range(len(queArr)):
        if( queArr[i] == que ):
            no = i
            break

    print(no)
    os.remove(filename)

    # _id = str(uuid4())  # Generates random ID for new user
    _id = str(no) + '-' + email

    db.collection('answers').document(_id).set({ "text" :  input_text ,  "prediction" : label_mapping[prediction[0]] , "que" : que })
    return label_mapping[prediction[0]]