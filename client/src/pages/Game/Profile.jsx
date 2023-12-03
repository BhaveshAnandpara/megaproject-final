import React from "react";
import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    
    const [playerName, setPlayerName] = useState("");
    const [playerIcon, setPlayerIcon] = useState("");

    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleIconClick = (iconUrl) => {
        setPlayerIcon(iconUrl);
    };

    const handleSubmit = () => {
        
        if (!playerName) {
            alert("Enter Name");
        } else if (!playerIcon) {
            alert("Select an Icon");
        } else {
            localStorage.setItem("playerName", playerName);
            localStorage.setItem("playerIcon", playerIcon);
            navigate('/student/game/story')
        }
    };

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
                <div className="game-container" style={{ justifyContent: 'space-evenly' }} >

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

                        <h1
                            style={{
                                textAlign: "left",
                                width: "100%",
                                marginLeft: "20%",

                            }}
                        >
                            Play As
                        </h1>

                        <div
                            className="box"
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <img
                                className="profile"
                                id="player1"
                                src="https://ik.imagekit.io/ijb85a2qd/boy.png?updatedAt=1700458661965"
                                alt="boy character"
                                style={{ padding: "0px 20px", width: "60px", height: "60px", cursor: 'pointer' }}
                                onClick={() =>
                                    handleIconClick(
                                        "https://ik.imagekit.io/ijb85a2qd/boy.png?updatedAt=1700458661965"
                                    )
                                }
                            />
                            <img
                                className="profile"
                                id="player2"
                                src="https://ik.imagekit.io/ijb85a2qd/Girl.png?updatedAt=1700458662188"
                                alt="girl character"
                                style={{ padding: "0px 20px", width: "60px", height: "60px", cursor: 'pointer' }}
                                onClick={() =>
                                    handleIconClick(
                                        "https://ik.imagekit.io/ijb85a2qd/Girl.png?updatedAt=1700458662188"
                                    )
                                }
                            />
                            <img
                                className="profile"
                                id="player3"
                                src="https://ik.imagekit.io/ijb85a2qd/ninja.png?updatedAt=1700458661949"
                                alt="ninja character"
                                style={{ padding: "0px 20px", width: "60px", height: "60px", cursor: 'pointer' }}
                                onClick={() =>
                                    handleIconClick(
                                        "https://ik.imagekit.io/ijb85a2qd/ninja.png?updatedAt=1700458661949"
                                    )
                                }
                            />
                        </div>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

                        <h1
                            style={{
                                textAlign: "left",
                                width: "100%",
                                marginLeft: "20%",
                            }}
                        >
                            Enter Your Name
                        </h1>

                        <label htmlFor="Name"></label>
                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            size="40"
                            placeholder="Chota Bheem..."
                            style={{
                                width: "70%",
                                padding: "12px 24px",
                            }}
                            onChange={handleNameChange}
                        />
                    </div>


                    <button
                        className="game-btn"
                        onClick={() => handleSubmit()}
                    >
                        Play
                    </button>
                </div>
            </section>
        </>
    );
}
