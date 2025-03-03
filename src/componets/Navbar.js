import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sybol from "../assets/cutlery.ico";
import Cart from "../assets/icart.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(!user);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("usertype");

  // Fetch user details when component mounts
  useEffect(() => {
    if (!token || user) {
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
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Store user data
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  // Listen for localStorage changes (e.g., after login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("user"); // Clear user data
    setUser(null);
    navigate("/login");
    window.dispatchEvent(new Event("storage")); // Force update across tabs
  };

  // Handle Navbar Toggle
  const handleToggle = () => {
    const offcanvasMenu = document.getElementById("offcanvasMenu");
    if (offcanvasMenu) {
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasMenu);
      bsOffcanvas.toggle();
    }
  };

  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Logo Section */}
        <div className="d-flex align-items-center">
          <a href="/">
            <img src={Sybol} alt="Logo" style={{ width: "40px", height: "40px" }} className="rounded-lg" />
          </a>
        </div>

        {/* User Info */}
        <div className="d-flex flex-column align-items-center mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <h5 className="m-0">{user.name}</h5>
              <small>{user.email}</small>
            </>
          ) : (
            <h5 className="m-0">Guest</h5>
          )}
        </div>

        {/* Cart & Menu */}
        <div className="d-flex align-items-center ms-auto">
          <button className="btn border-0 position-relative" onClick={() => navigate("/cart")}>
            <img src={Cart} alt="Cart" className="w-5 h-5 rounded-lg" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">1</span>
          </button>

          {/* Navbar Toggle Button */}
          <button className="navbar-toggler ms-3" type="button" onClick={handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Offcanvas Menu */}
        <div className="offcanvas offcanvas-end" id="offcanvasMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">DishDash</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/menu">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/order">Orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/location">Location</a>
              </li>
              {token && (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/profile")}>Profile</button>
                </li>
              )}
              {userType === "admin" && (
                <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin Panel</a>
                </li>
              )}
              <li className="nav-item">
                {token ? (
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                ) : (
                  <a className="nav-link" href="/login">Login</a>
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
