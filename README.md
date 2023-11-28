
  # Umeed( Enhanced Student Mental Health Platform ) 🧠
  
  ## Installation Guide 🚀  
  There are two folders `client` and `server`

  - client : It contains React App 
  - server : It contains Flask server 

  ## How to start
  #### client
  - run `cd client` to change directory to client
  - run `npm i` to install all the dependencies
    - after install dependencies you might get an error 'react-scripts not defined' to resolve this simply run `npm i react-script --save`
  - run `npm start` to start the application
  - the application will open in http://localhost:3000

 #### server
  - create a virtual enviroment by using command `python -m venv myenv`
  - activate the virtual env using `./myenv/Scripts/activate` for Windows powershell
  - install all the dependencies using `pip install flask flask_cors pydub soundfile scikit-learn firebase_admin joblib xgboost`
  - you should have ffmpeg. if it is not installed then install it using this guide https://phoenixnap.com/kb/ffmpeg-windows
  - run `flask run` to start the flask server
  - the server will start at http://localhost:8000.




