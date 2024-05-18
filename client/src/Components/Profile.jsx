import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Container3">
      <div className="profile-section">
        <div className="profileimg"></div>
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>College: XYZ University</p>
          <p>Gender: Male</p>
          {/* Dummy additional profile information */}
          <div className="profile-additional-info">
            <p>Date of Birth: 01/01/1990</p>
            <p>Email: johndoe@example.com</p>
            <p>Country: USA</p>

            <p>Phone: +1234567890</p>
          </div>
          <button>Edit Profile</button>
        </div>
      </div>
      <div className="history-section">
        <div className="contest-section">
          <div className="aptihistory">
            <h2>Aptitude Quiz History</h2>
            <ul>
              <li>Game 1 - Score: 100</li>
              <li>Game 2 - Score: 90</li>
              <li>Game 3 - Score: 80</li>
              {/* Add more game history items here */}
            </ul>
          </div>
          <div className="verhis">
            <h2>Verbal Quiz History</h2>
            <ul>
              <li>Game 1 - Score: 100</li>
              <li>Game 2 - Score: 90</li>
              <li>Game 3 - Score: 80</li>
              {/* Add more game history items here */}
            </ul>
          </div>
          <div className="global">
            <h2>Global Quiz History</h2>
            <ul>
              <li>Game 1 - Score: 100</li>
              <li>Game 2 - Score: 90</li>
              <li>Game 3 - Score: 80</li>
              {/* Add more game history items here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
