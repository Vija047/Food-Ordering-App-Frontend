import React, { useState } from "react"; 
// Fix: Import useState correctly
import { FaUser, FaLock, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [issinup, setsinup] = useState(false);

  const togglesinup = () => {
    setsinup(!issinup);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg">
      <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "20px" }}>
        <h3 className="text-center">Login</h3>

        {/* Username Input */}
        <div className="input-group my-3">
          <span className="input-group-text">
            <FaUser />
          </span>
          <input type="text" className="form-control" placeholder="Username or Email" />
        </div>

        {/* Password Input */}
        <div className="input-group my-3">
          <span className="input-group-text">
            <FaLock />
          </span>
          <input type="password" className="form-control" placeholder="Password" />
        </div>

        {/* Login Button */}
        <button className="btn btn-primary w-100">LOGIN</button>

        {/* Forgot Password */}
        <p className="text-center mt-2">
          <a href="#">Forgot Password?</a>
        </p>

        {/* Sign Up Link */}
        <p className="text-center">
          Don't have an account?{" "}
          <a href="#" onClick={togglesinup}>
            Sign Up
          </a>
        </p>

        <hr />

        {/* Social Media Login */}
        <p className="text-center">Sign up with Social Networks</p>
        <div className="d-flex justify-content-center">
          <a href="#" className="mx-2 text-primary">
            <FaFacebook size={25} />
          </a>
          <a href="#" className="mx-2 text-danger">
            <FaGoogle size={25} />
          </a>
          <a href="#" className="mx-2 text-info">
            <FaTwitter size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;