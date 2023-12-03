import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import mazeImage from "../../assets/Game/maze.png";
import treasureImage from "../../assets/Game/treasure1.png";

export default function Story() {

    const [nextStep, setnextStep] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            setnextStep(true)
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
                }}
            >
                <div
                    className="game-container"
                    style={{ justifyContent: "space-evenly" }}
                >

                    {
                        !nextStep &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '90%' }} >
                                <img src={localStorage.getItem("playerIcon")} alt="character" style={{ transform: 'scale(0.8)', translate: '0% 70%' }} />
                                <p className="caption"  >I want to find the TREASURE! </p>
                            </div>

                            <img
                                src={mazeImage}
                                alt="maze"
                                style={{
                                    display: "block",
                                    paddingTop: "38px",
                                    width: "50%",
                                }}
                            />

                            {/* Treasure */}
                            <div
                                className="treasure"
                            >
                                <img src={treasureImage} alt="treasure" />
                            </div>

                            {/* Next Button */}
                            <button className="game-btn" >
                                Next
                            </button>
                        </>
                    }


                    {
                        nextStep &&
                        <>

                            <img src={localStorage.getItem("playerIcon")} alt="character" style={{ transform: 'scale(0.8)', translate: '0% 70%' }} />

                            <p className="caption" style={{  'border-bottom-left-radius': '30px' }} >I will have to go through this maze </p>

                            <button className="game-btn" onClick={()=> navigate('/student/game/start')} >
                                Next
                            </button>
                        </>
                    }


                </div>
            </section>
        </>
    );
}
