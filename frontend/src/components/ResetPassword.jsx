import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { resetPassword, validateToken } from "../services/authService";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  useEffect(() => {
    validateToken(token).catch(() =>
      alert("Reset link expired")
    );
  }, [token]);

  const submit = async () => {
    try {
      await resetPassword(token, password);
      alert("Password reset successful");
    } catch {
      alert("Failed to reset password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h4>Reset Password</h4>
        <input
          type="password"
          className="form-control my-3"
          placeholder="New Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-success" onClick={submit}>
          Update Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;