import React, { useRef, useState } from "react";
import girlImage from "../../assets/Game/Girl.png";
import { useNavigate } from "react-router-dom";

export default function Que1() {
    const [show, setShow] = useState(false);

    const girlRef = useRef();
    const boyRef = useRef();

    const navigate = useNavigate()

    setTimeout(() => {
        if (girlRef.current !== undefined && !show)
            girlRef.current.textContent = "We are playing Cricket !! Join us";
        if (boyRef.current !== undefined && !show)
            boyRef.current.textContent = "Let me Think";
    }, 2000);

    const handleClick = (e) => {
        localStorage.setItem('Q1', e.target.id)
        navigate('/student/game/end')
    }

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
                    {!show && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "90%",
                                height: "90%",
                            }}
                        >
                            {/* Girl */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <img
                                    src={girlImage}
                                    alt="character"
                                    style={{
                                        transform: "scale(0.8)",
                                    }}
                                />

                                <p
                                    className="caption"
                                    ref={girlRef}
                                    style={{
                                        borderBottomLeftRadius: "5px",
                                        translate: "0% -100%",
                                    }}
                                >
                                    Hey {localStorage.getItem("playerName")}! What are you up to?
                                </p>
                            </div>

                            {/* Boy */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <p
                                    className="caption"
                                    ref={boyRef}
                                    style={{
                                        borderBottomRightRadius: "5px",
                                        borderBottomLeftRadius: "30px",
                                    }}
                                >
                                    Studying hard for upcoming exams
                                </p>

                                <img
                                    src={localStorage.getItem("playerIcon")}
                                    alt="character"
                                    style={{
                                        transform: "scale(0.8)",
                                        translate: "0% 70%",
                                    }}
                                />
                            </div>

                            {/* Button */}

                            <button
                                className="game-btn"
                                style={{ marginTop: "24px" }}
                                onClick={() => setShow(true)}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {show && (
                        <>
                            <img
                                src={localStorage.getItem("playerIcon")}
                                alt="character"
                            />

                            <p style={{ fontSize: '24px', fontWeight: '600' }} >Come up with a strategy for you</p>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

                                <div className="option" >

                                    <p className="q1-title-1 result" >Play for 4 Hours Daily</p>
                                    <p id="false" onClick={(e) => handleClick(e)} className="q1-ans-1"  >Get 75% in Exams</p>

                                </div>

                                <div className="option" >

                                    <p className="q2-title-2 result" >Play for 2 Hours Daily</p>
                                    <p id="true" onClick={(e) => handleClick(e)} className="q2-ans-2"  >Get 80% in Exams</p>

                                </div>

                                <div className="option" >

                                    <p className="q3-title-3 result" >Play for 1 Hours Daily</p>
                                    <p id="true" onClick={(e) => handleClick(e)} className="q3-ans-3"  >Get 90% in Exams</p>

                                </div>


                            </div>

                        </>
                    )}
                </div>
            </section>
        </>
    );
}
