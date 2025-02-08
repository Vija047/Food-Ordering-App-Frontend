import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Toggle function for offcanvas menu
  const toggleOffCanvas = () => {
    setOffCanvasOpen(!isOffCanvasOpen);
  };

  // Check if user is authenticated (JWT Token exists)
  const isAuthenticated = !!localStorage.getItem("token");

  // Fetch user data from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:7000/getUser", {
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
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.message||"an unepected error occurred");
        setLoading(false);
      });
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className=" navbar sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            DishDash
          </a>

          {/* <form className="d-flex mt-2" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form> */}

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleOffCanvas}
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas Section */}
          <div className={`offcanvas offcanvas-end text-bg ${isOffCanvasOpen ? "show" : ""}`} id="offcanvasDarkNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">DishDash</h5>
              <button type="button" className="btn-close" onClick={toggleOffCanvas} aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" href="/home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/order">Orders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
                <li className="nav-item">
                  {isAuthenticated ? (
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
    </>
  );
}

export default Navbar;
