import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    collegeName: "",
    enrollmentNumber: "",
    branch: "",
    year: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Log the formData before making the request

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        formData
      );
      if (res.data.success) {
        alert("Signup successful!");
        // Optionally redirect to login page or do something else
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup successful!:", error);
      alert("Go");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Signup Form</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="collegeName">College Name:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            className="input"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="enrollmentNumber">Enrollment Number:</label>
          <input
            type="text"
            id="enrollmentNumber"
            name="enrollmentNumber"
            className="input"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            name="branch"
            className="input"
            value={formData.branch}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            className="input"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            name="semester"
            className="input"
            value={formData.semester}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
