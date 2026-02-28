import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://password-reset-app-2dia.onrender.com/api/auth/forgot-password",
        { email }
      );

      alert("Reset link sent to your email!");
    } catch (error) {
      alert(
        error.response?.data?.message || "Error sending reset link"
      );
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;