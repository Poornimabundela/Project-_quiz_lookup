import React, { useState, useEffect } from "react";

const Sunday = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Countdown timer
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [quizStarted, timeLeft]);

  // Prevent window switch before starting the quiz
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!quizStarted) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [quizStarted]);

  return (
    <div>
      {!quizStarted ? (
        <div>
          <h2>Sunday Quiz</h2>
          <p>Rules:</p>
          <ul>
            <li>Do not switch the window before starting the quiz.</li>
            <li>Complete the quiz within the time limit.</li>
          </ul>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Quiz in Progress</h2>
          <p>
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </p>
          {/* Add quiz questions and components here */}
        </div>
      )}
    </div>
  );
};

export default Sunday;
