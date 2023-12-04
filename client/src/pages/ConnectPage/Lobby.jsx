import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./context/SocketProvider";
import "../ConnectPage/Lobby.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/student/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="ConnectContainer">
      <div className="HeadingLobby">
        <h1>Lobby</h1>

        <div className="LobbyConnectPage">
          <form onSubmit={handleSubmitForm}>
            <div className="LobbyEmail">
              <label htmlFor="email">Email ID</label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <div className="LobbyRoom">
              <label htmlFor="room">Room Number</label>
            </div>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <br />
            <div className="LobbyJoin">
              <button className="BtnConnect">Join</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
