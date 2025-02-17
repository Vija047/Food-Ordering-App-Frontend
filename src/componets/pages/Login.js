import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register"; // Import Register component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Fix: Proper state for success message
  const [showRegister, setShowRegister] = useState(false); // Toggle Register form
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // ✅ Clear previous success messages

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
      setSuccess("Login Successfully! 🎉"); // ✅ Show success message
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        {showRegister ? (
          <>
            <h2 className="text-center text-primary">Register</h2>
            <Register /> {/* Show Register form */}
            <p className="text-center mt-3">
              Already have an account?{" "}
              <button className="btn btn-link p-0 text-primary" onClick={() => setShowRegister(false)}>
                Login Here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center text-primary">Login</h2>

            {/* ✅ Fix: Show success and error messages */}
            {success && <div className="alert alert-success">{success}</div>}
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
                Don't have an account?{" "}
                <button className="btn btn-link p-0 text-primary" onClick={() => setShowRegister(true)}>
                  Sign Up
                </button>
              </p>
            </div>

            {/* Social Logins */}
            <div className="text-center mt-3">
              <button className="btn btn-danger w-100 my-1">Login with Google</button>
              <button className="btn btn-primary w-100 my-1">Login with Facebook</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
