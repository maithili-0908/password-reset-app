import React, { useState, useEffect } from "react";
import {
  resetPassword,
  validateToken
} from "../services/authService";

function ResetPassword({ match }) {
  const [password, setPassword] = useState("");
  const token = match.params.token;

  useEffect(() => {
    validateToken(token).catch(() =>
      alert("Link expired")
    );
  }, [token]);

  const submit = async () => {
    await resetPassword(token, password);
    alert("Password reset successful");
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
