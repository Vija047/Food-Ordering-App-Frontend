import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sybol from "../assets/input-onlinepngtools (2).ico";
import Cart from "../assets/icart.svg";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const toggleOffCanvas = () => setOffCanvasOpen(!isOffCanvasOpen);
  const isAuthenticated = !!localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:7000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user data");
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error?.message || "An unexpected error occurred");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleProfile = () => navigate("/profile");

  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section: Logo */}
        <div className="d-flex flex-row align-items-center">
          <a href="/">
            <img
              src={Sybol}
              alt="Symbol"
              className="w-16 h-16 object-cover rounded-lg"
            />
          </a>
        </div>

        {/* Right Section: Cart Icon and Offcanvas Button */}
        <div className="d-flex align-items-center ms-auto">
          <button className="badge badge-danger btn border-0 position-relative">
            <img
              src={Cart}
              alt="Cart"
              className="w-5 h-5 object-cover rounded-lg"
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1
            </span>
          </button>

          <button
            className="navbar-toggler ms-3"
            type="button"
            onClick={toggleOffCanvas}
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Offcanvas Menu */}
        <div
          className={`offcanvas offcanvas-end ${isOffCanvasOpen ? "show d-block" : ""}`}
          id="offcanvasDarkNavbar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              DishDash
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleOffCanvas}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/order">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleProfile}>
                  Profile
                </button>
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;