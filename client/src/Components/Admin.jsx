import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [apiKey, setApiKey] = useState("");

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/fetch-quiz", { apiKey });
      console.log(response.data); // Handle quiz data received from backend
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="apiKeyInput">Enter API Key:</label>
      <input
        type="text"
        id="apiKeyInput"
        value={apiKey}
        onChange={handleApiKeyChange}
        required
      />
      <button type="submit">Fetch Quiz</button>
    </form>
  );
};

export default Admin;
