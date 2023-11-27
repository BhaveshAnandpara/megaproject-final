import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import FormData from "form-data";
import "./Assessment.css";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Assessment() {


  const [state, setState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  const que = [
    "Tell me a bit about yourself ?",
    "What is the problem you are suffering from currently ?",
    "How would you describe your sleep schedule?",
  ];
  const navigate = useNavigate();

  if( localStorage.getItem('auth') === null ) navigate('/login')

  const start = () => {
    if (state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setState({ ...state, isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setState({ ...state, blobURL, isRecording: false });

        let file = new File([blob], `audio-${count + 1}.mp3`);

        console.log(file);

        var formdata = new FormData();
        formdata.append("audio_file", file);
        formdata.append("que", que[count]);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("http://localhost:8000/predict", requestOptions)
          .then(() => {
            if (count !== que.length - 1) setCount(count + 1);
            else navigate("/student/home");
          })
          .catch((error) => alert("Error Occured"));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header"> </header>

      <div className="assess-container">
        {!started && (
          <p
            className="asess-btn"
            onClick={() => {
              setStarted(true);
              start();
            }}
          >
            {" "}
            Start the Assessment{" "}
          </p>
        )}

        {started && (
          <>
            <div className="que-container">{que[count]}</div>

            <Webcam style={{ width: "50%", height: "50%" }} />

            {count === que.length - 1 ? (
              <p
                className="next-btn"
                onClick={stop}
                disabled={!state.isRecording}
              >
                Submit
              </p>
            ) : (
              <p
                className="next-btn"
                onClick={stop}
                disabled={!state.isRecording}
              >
                Next
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
