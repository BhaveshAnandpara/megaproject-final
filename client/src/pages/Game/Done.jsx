import React from "react";
import { useNavigate } from "react-router-dom";

export default function Done() {

    const navigate = useNavigate()

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
                }}
            >
                <div
                    className="game-container"
                    style={{ justifyContent: "space-evenly" }}
                >
                    <img
                        src={localStorage.getItem("playerIcon")}
                        alt="character"
                        style={{ transform: "scale(0.8)", translate: "0% 70%" }}
                    />

                    <div style={{ width: '100%' }} >

                        <p style={{ fontSize: "24px", fontWeight: "600", textAlign: 'center' }}>Well Done !</p>

                        <p style={{ fontSize: "20px", fontWeight: "600", textAlign: 'center', color: '#272727', padding: '0px 10%' }}>
                            Assessment is done now ! <br /> The results will be conveyed later
                        </p>

                    </div>

                    <button className="game-btn" onClick={() => navigate('/student/recommendation')} >Next</button>
                </div>
            </section>
        </>
    );
}
