import React, { useState } from "react";
import "./Admin.css"; // Importing CSS file for styling

const Admin = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <ul>
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => handleSectionChange("profile")}
          >
            Profile
          </li>
          <li
            className={activeSection === "createQuiz" ? "active" : ""}
            onClick={() => handleSectionChange("createQuiz")}
          >
            Create Quiz
          </li>
          <li
            className={activeSection === "history" ? "active" : ""}
            onClick={() => handleSectionChange("history")}
          >
            History
          </li>
          <li
            className={activeSection === "sundayQuiz" ? "active" : ""}
            onClick={() => handleSectionChange("sundayQuiz")}
          >
            Sunday Quiz
          </li>
        </ul>
      </div>
      <div className="main-content">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "createQuiz" && <CreateQuizSection />}
        {activeSection === "history" && <HistorySection />}
        {activeSection === "sundayQuiz" && <SundayQuizSection />}
      </div>
    </div>
  );
};

const ProfileSection = () => {
  return (
    <div className="section">
      <div className="profileimg"></div>
      <h2>Profile Section</h2>
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <p>Role: Admin</p>
    </div>
  );
};

const CreateQuizSection = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", ""], answer: "" },
  ]);

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", ""], answer: "" },
    ]);
  };

  return (
    <div className="section">
      <h2>Create Quiz Section</h2>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <label>Question {index + 1}:</label>
          <input
            type="text"
            name="question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          <label>Options:</label>
          {q.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e)}
            />
          ))}
          <label>Answer:</label>
          <input
            type="text"
            name="answer"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button>Submit Quiz</button>
      <button>Previous</button>
    </div>
  );
};

const HistorySection = () => {
  return <div className="section">History Section</div>;
};

const SundayQuizSection = () => {
  // Functionality for Sunday Quiz
  // You can add functionality for associating the Sunday quiz with two more admins here
  return (
    <div className="section">
      <h2>Sunday Quiz Section</h2>
      {/* Button to initiate or request the creation of the quiz with three sections */}
      <button>Initiate/Request Sunday Quiz</button>
    </div>
  );
};

export default Admin;
