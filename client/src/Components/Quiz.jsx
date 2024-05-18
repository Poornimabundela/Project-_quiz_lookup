import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setShowResult(false);
    fetchQuestions();
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Quiz Result</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <div>
            {currentQuestion.incorrect_answers.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option${index}`}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
            <input
              type="radio"
              id="correctOption"
              name="options"
              value={currentQuestion.correct_answer}
              checked={selectedOption === currentQuestion.correct_answer}
              onChange={() =>
                handleOptionSelect(currentQuestion.correct_answer)
              }
            />
            <label htmlFor="correctOption">
              {currentQuestion.correct_answer}
            </label>
          </div>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
