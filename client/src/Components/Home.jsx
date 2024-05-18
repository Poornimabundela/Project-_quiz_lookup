import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

// Import SubBox component if defined elsewhere
// import SubBox from "./SubBox";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.userInfo) {
          setUserInfo(response.data.userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout");
      if (response.data.status) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  const topScores = [
    { name: "Sunit", score: 54 },
    { name: "amit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "ankit", score: 54 },
    { name: "kituu", score: 54 },
    { name: "aslmal", score: 54 },
  ];

  const subBoxes = [
    { name: "AWS" },
    { name: "software" },
    { name: "Reasoning" },
    { name: "javascript" },
    { name: "++C" },
    { name: "DSA" },
    { name: "Verbal" },
    { name: "Aptitude" },
    { name: "Computer Network" },
    { name: "Java" },
    { name: "Python" },
  ];

  return (
    <div>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <img src="./image/logo2.png" alt="Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className="header">
          <div className="head1">
            <h1>Student</h1>
            <h2>Lookup</h2>
          </div>
          <div className="head2">
            <div className="fox2">
              <img src="./image/background.png" alt="Background" />
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="dox1">
            <div className="fox">
              <p>
                Empowering <br /> Learning <br /> Communities
              </p>
              <div className="sort">
                <img src="./image/rubic.png" alt="Rubic" />
              </div>
            </div>
            <div className="fox">
              <p>
                Seamless <br />
                Quiz <br /> Experience
              </p>
              <div className="sort">
                <img src="./image/confused.png" alt="Confused" />
              </div>
            </div>
            <div className="fox">
              <p>
                Fostering <br /> Knowledge <br />
                Gaining
              </p>
              <div className="sort">
                <img src="./image/boy.png" alt="Boy" />
              </div>
            </div>
          </div>
          <div className="dox2">
            <img src="./image/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="container3">
          <h1>Welcome </h1>

          <div className="overlay">
            {" "}
            <h1>Scorll </h1>
          </div>
          <div className="main-3 scrollbar-horizontal-right-to-left">
            {/* Render sub-boxes using the SubBox component */}
            {subBoxes.map((box, index) => (
              <div key={index}>{box.name}</div>
            ))}
          </div>
        </div>

        <div className="container4">
          <div className="sunday">
            {" "}
            <h1>Sunday Quiz</h1>
            <h2>every sunday 10:30 to 11:30 </h2>
            <div className="sunday-img"></div>
          </div>
          <div className="rules">
            <h2>Sunday Quiz Rules</h2>

            <ul>
              <li>
                <strong>Timing:</strong> Every Sunday from 10:30 AM to 11:30 AM.
              </li>
              <li>
                <strong>No Switching:</strong> Switching tabs or applications
                will result in automatic logout. Logged-out users are barred for
                2 hours.
              </li>
              <li>
                <strong>Submission:</strong> Must submit answers by 11:30 AM.
                Auto-submission if time expires.
              </li>
              <li>
                <strong>Single Attempt:</strong> Only one attempt allowed per
                quiz.
              </li>
              <li>
                <strong>Fair Play:</strong> No external help or cheating.
              </li>
              <li>
                <strong>Integrity:</strong> Violations result in
                disqualification.
              </li>
            </ul>
          </div>
        </div>

        <div className="dashboard">
          <div className="left"></div>
          <div className="right">
            <h1>Dashboard</h1>
            <div className="scoreboard-container">
              <ul className="scoreboard">
                {topScores.map((player, index) => (
                  <li
                    key={index}
                    className={index < 3 ? "player top-score" : "player"}
                  >
                    <span className="player-name">{player.name}</span>
                    <span className="score">Score: {player.score}</span>
                    <div className="scoreball"></div> {/* Scoreball */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <footer></footer>
      </div>
    </div>
  );
};

export default Home;
