import React, { useEffect, useRef } from "react";
import maze from "../../assets/Game/mazePath1.png";
import { useNavigate } from "react-router-dom";

export default function StartGame() {
  const profileRef = useRef();
  const navigate = useNavigate();

  const startAnimation = () => {
    let profile = profileRef.current;
    profile.style.translate = "20% 150%";

    setTimeout(() => {
      profile.style.translate = "250% 150%";

      if (!window.location.href.includes("end")) {
        setTimeout(() => {
          navigate("/student/game/Q1");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/student/game/done");
        }, 1000);
      }
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 2000);
  }, []);

  return (
    <>
      <section
        style={{
          border: "1px solid black",
          width: "26vw",
          height: "98vh",
          position: "absolute",
          left: "50%",
          translate: "-50% 0%",
          overflow: "hidden",
        }}
      >
        <div className="game-container">
          <img
            src={localStorage.getItem("playerIcon")}
            alt="character"
            ref={profileRef}
            style={{
              transform: "scale(0.8)",
              translate: "20% -50%",
              transition: "0.8s linear",
            }}
          />

          <img src={maze} alt="maze" style={{ transform: "scale(0.8)" }} />

          {!window.location.href.includes("end") && (
            <button className="game-btn"> Let's Go </button>
          )}
        </div>
      </section>
    </>
  );
}
