import React, { useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [userEmail, setUserEmail] = useState("");
  const [quizType, setQuizType] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/save", {
        userEmail,
        quizType,
        score: parseInt(score),
      });

      if (response.data.status) {
        alert("Score saved successfully");
        setUserEmail("");
        setQuizType("");
        setScore("");
      } else {
        alert("Failed to save score");
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with an error status code
        console.log("Error Response:");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(`Failed to save score: ${error.response.data.error}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error Request:");
        console.log(error.request);
        alert("Failed to save score: No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("General Error:");
        console.log("Error", error.message);
        alert("Failed to save score: An unexpected error occurred");
      }
      console.log("Error Config:");
      console.log(error.config);
    }
  };

  return (
    <div>
      <h1>Enter Quiz Score</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <br />

        <label>Quiz Type:</label>
        <input
          type="text"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
          required
        />
        <br />

        <label>Score:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <br />

        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};

export default Quiz;
