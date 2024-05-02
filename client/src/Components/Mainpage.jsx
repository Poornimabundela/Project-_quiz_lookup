import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Mainpage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [aptitudeScore, setAptitudeScore] = useState(null);
  const [englishScore, setEnglishScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [aptitudeHighestScore, setAptitudeHighestScore] = useState(0);
  const [englishHighestScore, setEnglishHighestScore] = useState(0);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (res.data.userInfo) {
          setUserInfo(res.data.userInfo);
        } else {
          // Handle if user info is not available
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // Handle error
      });
  }, []);

  const handleQuizComplete = (quizName, score) => {
    // Update the corresponding score state
    switch (quizName) {
      case "Aptitude":
        setAptitudeScore(score);
        if (score > aptitudeHighestScore) {
          setAptitudeHighestScore(score);
          saveHighestScore(userInfo._id, "Aptitude", score);
        }
        break;
      case "English":
        setEnglishScore(score);
        if (score > englishHighestScore) {
          setEnglishHighestScore(score);
          saveHighestScore(userInfo._id, "English", score);
        }
        break;
      default:
        break;
    }

    // Update history with the new score
    const updatedHistory = [...history, { quizName, score }];
    setHistory(updatedHistory);
  };

  const saveHighestScore = async (userId, quizName, score) => {
    try {
      await axios.post("http://localhost:3000/scores/save-scores", {
        userId,
        quizName,
        score,
      });
    } catch (error) {
      console.error("Error saving highest score:", error);
    }
  };

  return (
    <div className="container">
      {userInfo ? (
        <div className="message">
          <h2 className="userInfo">Welcome, {userInfo.username}</h2>
          <p className="userInfo">College Name: {userInfo.collegeName}</p>
          <p className="userInfo">Branch: {userInfo.branch}</p>

          {/* Display quiz results */}
          <div className="result-section">
            {aptitudeScore !== null ? (
              <p>Aptitude Quiz Result: {aptitudeScore}</p>
            ) : (
              <p>No aptitude quiz result available.</p>
            )}
            {englishScore !== null ? (
              <p>English Quiz Result: {englishScore}</p>
            ) : (
              <p>No English quiz result available.</p>
            )}
          </div>

          {/* Display highest scores */}
          <div className="result-section">
            <p>Highest Aptitude Score: {aptitudeHighestScore}</p>
            <p>Highest English Score: {englishHighestScore}</p>
          </div>

          {/* Display quiz history */}
          <div className="history-section">
            <h2>Quiz History</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  {item.quizName} - Score: {item.score}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Mainpage;
