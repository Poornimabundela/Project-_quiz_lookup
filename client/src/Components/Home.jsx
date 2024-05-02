import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // useEffect for fetching user info and logout
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
        console.error("Error fetching user info:", response, error);
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

  return (
    <div className="container1">
      {/* Header Section */}
      <header className="header-section">
        <img src="../image/logo.png" alt="" className="logo-image" />
        <h1>Welcome to Lookup Quiz</h1>
        <p>Emotion All About Lookup Quiz from TIT College</p>
      </header>

      {/* Top right section for login/logout and start game */}
      <div className="top-right-section">
        {userInfo ? (
          <div className="user-info-container">
            <p className="username">{userInfo.username}</p>
            <Link to="/Mainpage" className="nav-link">
              Profile
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>

      {/* Center component with three boxes */}
      <div className="box-container">
        <div className="box">
          <h2>Quiz aptitude</h2>
          <p>Test your knowledge with our quiz!</p>
          <Link to="/quiz" className="link-button">
            Start Quiz
          </Link>
        </div>
        <div className="box">
          <h2>verbal Quiz</h2>
          <p>View the latest leaderboard standings.</p>
          <Link to="/verbal" className="link-button">
            View Leaderboard
          </Link>
        </div>
        <div className="box">
          <h2>Profile</h2>
          <p>Manage your profile and settings.</p>
          <Link to="/profile" className="link-button">
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
