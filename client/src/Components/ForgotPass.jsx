import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3000/auth/forgotpassword", {
      email: formData.email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Check your email for password reset instructions");
          navigate("/login"); // Redirect to the login page
        } else {
          console.log("Unexpected response from server:", response);
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error.message);
      });
  };

  return (
    <div className="sign-up-container">
      <h2>Forgot Password</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="off"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPass;
