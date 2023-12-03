import React, { useState, useRef, useEffect } from "react";
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
  const webcamRef = useRef(null);
  const intervalref = useRef(null);

  var intervalId = null;

  const que = [
    "Tell me a bit about yourself ?",
    "What is the problem you are suffering from currently ?",
    "How would you describe your sleep schedule?",
  ];

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const start = () => {
    if (auth === null) navigate("/login");

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

        const updatedCount = count + 1; // Increment count here
        setCount(updatedCount);

        start();

        var formdata = new FormData();
        formdata.append("audio_file", file);
        formdata.append("que", que[count]);
        formdata.append("email", auth.email);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("https://ummeed-backend.onrender.com/predict", requestOptions)
          .then(() => {
            if (count == que.length - 1) navigate("/student/home");
          })
          .catch((error) => alert("Error Occured"));
      })
      .catch((e) => console.log(e));
  };

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const date = new Date();
    const file = new File([blob], `snapshot-${date.getTime()}.png`, {
      type: "image/png",
    });

    // Send the file to your API
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("email", auth.email);
    // Add other data to the formdata if needed (e.g., que, email)

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://ummeed-backend.onrender.com/predictEmotion", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.log("Error Occurred"));
  };

  const takeSnapshots = () => {
    intervalref.current = setInterval(() => {
      capture(); // Use the provided count value here
    }, 2000);
  };

  const stopRecordingAndNavigate = () => {
    clearInterval(intervalref.current);

    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setState({ ...state, blobURL, isRecording: false });

        navigate("/student/recommendation"); // Navigate to home page after stopping recording
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
              takeSnapshots();
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

            <Webcam ref={webcamRef} style={{ width: "50%", height: "50%" }} />

            {count === que.length - 1 ? (
              <p
                className="next-btn"
                onClick={stopRecordingAndNavigate}
                disabled={!state.isRecording}
              >
                Submit
              </p>
            ) : (
              <>
                <p
                  className="next-btn"
                  onClick={stop}
                  disabled={!state.isRecording}
                >
                  Next
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
