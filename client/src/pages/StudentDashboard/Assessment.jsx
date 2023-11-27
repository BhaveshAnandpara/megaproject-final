import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import FormData from "form-data";
import "./Assessment.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Assessment() {
  const [state, setState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const [started, setStarted] = useState(false);

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

        let file = new File([blob], "audio.mp3");

        console.log(file);

        var formdata = new FormData();
        formdata.append("audio_file", file);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("http://localhost:8000/predict", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      })
      .catch((e) => console.log(e));
  };

  const componentDidMount = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setState({ ...state, isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setState({ ...state, isBlocked: true });
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header"> </header>

      <div className="assess-container">
        {!started && (
          <p className="asess-btn" onClick={() => setStarted(true)}>
            {" "}
            Start the Assessment{" "}
          </p>
        )}

        {started && (
          <>
            <button onClick={start} disabled={state.isRecording}>
              Record
            </button>
            <button onClick={stop} disabled={!state.isRecording}>
              Stop
            </button>
            <audio src={state.blobURL} controls="controls" />
          </>
        )}
      </div>
    </div>
  );
}
