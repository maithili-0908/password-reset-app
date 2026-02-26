import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password/${token}`
        );
        setValid(true);
      } catch (err) {
        setError("Invalid or expired token");
      }
    };
    validate();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  if (!valid) return <p>{error}</p>;

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;