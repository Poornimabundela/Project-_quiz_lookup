import React, { useState, useEffect } from "react";
import axios from "axios";

const Verbal = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer in seconds for each question
  const [quizHistory, setQuizHistory] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // User's email for saving score

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleNextQuestion(); // Automatically go to the next question when time is up
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      if (response.data.results) {
        setQuestions(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Reset timer for the next question
    } else {
      setShowResult(true);
      saveQuizHistory(); // Save quiz history when quiz is complete
    }
  };

  const saveQuizHistory = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/save", {
        userId,
        userEmail,
        quizType: "verbal",
        score,
      });

      if (response.data.status) {
        console.log("Score saved successfully");
        // Optionally, you can update local state or perform any necessary actions upon successful score save
      } else {
        console.log("Failed to save score");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Error Response:");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error Request:");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
      console.log("Error Config:");
      console.log(error.config);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    fetchQuestions();
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    return (
      <div className="container2">
        <div className="header">
          <h2>Quiz Complete!</h2>
        </div>
        <div className="result">
          <p>
            Your Score: {score} out of {questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
          <h3>Quiz History</h3>
          <div className="quiz-history">
            {quizHistory.map((quizResult, index) => (
              <div key={index} className="quiz-result-box">
                <p>Date: {quizResult.date}</p>
                <p>
                  Score: {quizResult.score}/{quizResult.totalQuestions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <div className="header">
        <h2>Quiz</h2>
        <p>
          Question {currentQuestionIndex + 1}/{questions.length}
        </p>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />
      <div className="answer-container">
        {[
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ].map((answer, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <p className="score">Score: {score}</p>
      <label>Email:</label>
      <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
    </div>
  );
};

export default Verbal;
