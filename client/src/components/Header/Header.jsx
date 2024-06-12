import React, { useState } from "react";
// import {Link, useNavigate} from 'react-router-dom'
import "../Header/Header.css";
import { Link } from "react-router-dom";
import UmeedLogo from "../Header/UmeedLogo.png";
import ProfilePic from "../Header/ProfilePic.png";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  console.log(auth === null ? ProfilePic : auth);

  const navigate = useNavigate();

  return (
    <div className="NavContainer">
      <div className="UmeedName">
        <img src={UmeedLogo} alt="My Image" />
      </div>
      <div className="NavElements">
        <a
          className="NavHome Home"
          href=""
          onClick={() => navigate("/student/Home")}
        >
          <p>Home</p>
        </a>

        <a
          className="NavConnect Connect"
          href=""
          onClick={() => navigate("/student/game")}
        >
          <p>Test your Mental Health</p>
        </a>

        <a
          className="NavConnect Connect"
          href=""
          onClick={() => navigate("/student/lobby")}
        >
          <p>Connect</p>
        </a>

        <a
          className="NavTask Task"
          href=""
          onClick={() => navigate("/student/Tasks")}
        >
          <p>Task</p>
        </a>

        <a
          className="NavLogout Logout"
          href=""
          onClick={() => {
            localStorage.removeItem("auth")
          }}
        >
          <p>Logout</p>
        </a>
      </div>
      <img
        className="ProfileImg"
        src={auth === null ? ProfilePic : auth.profile}
        alt="My Image"
      />
    </div>
  );
}
