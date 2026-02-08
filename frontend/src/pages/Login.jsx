import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = e => {
    e.preventDefault();
    // later you can add API call here
    alert("Login clicked");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h4 className="mb-3">Login</h4>

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={submit}>
          Login
        </button>

        <button
          className="btn btn-link mt-2"
          onClick={() => history.push("/forgot-password")}
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default Login;