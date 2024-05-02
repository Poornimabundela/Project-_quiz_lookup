import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "0", // Default userType to "0" (User)
    secretKey: "mysecretid123", // Secret key for admin
  });

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, userType, secretKey } = formData;

    if (userType === "1") {
      // Check if user type is admin and secret key matches
      if (secretKey !== "mysecretid123") {
        alert("Invalid Admin"); // Secret key doesn't match
        return;
      }
    }

    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
      userType,
      secretKey,
    })
      .then((response) => {
        if (response.data.status) {
          if (userType === "1" && secretKey === "mysecretid123") {
            navigate("/admin"); // Redirect to admin page for valid admin
          } else {
            navigate("/"); // Redirect to home page for regular users
          }
        } else {
          console.log("Unexpected response from server:", response);
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error.message);
        if (error.response) {
          console.log("Server responded with:", error.response.data);
          alert("Login failed. Please check your credentials.");
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="sign-up-container">
      <img src="../image/logo.png" alt="" className="logo-image" />
      <h2>Login</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <label>
            <input
              type="radio"
              name="userType"
              value="0"
              checked={formData.userType === "0"}
              onChange={handleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="1"
              checked={formData.userType === "1"}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        {formData.userType === "1" && ( // Show secret key input only if userType is admin
          <input
            type="password"
            placeholder="Secret Key"
            id="secretKey"
            name="secretKey"
            value={formData.secretKey}
            onChange={handleChange}
          />
        )}
        <button type="submit">Login</button>
        <p>
          <Link to="/forgotPassword">Forgot Password</Link>
        </p>
        <p>
          Don't have an Account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
