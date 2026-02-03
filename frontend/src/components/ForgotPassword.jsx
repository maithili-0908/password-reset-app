import React, { useState } from "react";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    try {
      await forgotPassword(email);
      alert("Reset link sent");
    } catch {
      alert("User not found");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h4>Forgot Password</h4>
        <input
          className="form-control my-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={submit}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;