import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:7000/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Store token & Redirect
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center text-primary">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="mb-3 text-end">
            <a href="#" className="text-primary">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            LOGIN
          </button>
        </form>

        {/* Sign Up */}
        <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/register" className="text-primary">Sign Up</a>
          </p>
        </div>

        {/* Social Logins */}
        <div className="text-center mt-3">
          <button className="btn btn-danger w-100 my-1">Login with Google</button>
          <button className="btn btn-primary w-100 my-1">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
