import React, { useState } from "react"; // Import useState hook
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../App.css";
const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { token } = useParams(); // Import useParams hook

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

    Axios.post("http://localhost:3000/auth/reset-password/" + token, {
      password: formData.password, // Use formData.password instead of undefined password variable
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
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
      <h2>Reset Password</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          type="password" // Change type to "password" for password input
          autoComplete="off"
          name="password" // Change name to "password" for password input
          value={formData.password} // Use formData.password instead of formData.email
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ResetPassword;
