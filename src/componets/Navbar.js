import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon
import Sybol from "../assets/icons8-d-64.svg";

function Navbar() {
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Searching...");

  const navigate = useNavigate();

  const toggleOffCanvas = () => {
    setOffCanvasOpen(!isOffCanvasOpen);
  };

  const isAuthenticated = !!localStorage.getItem("token");

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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(data.address.city || data.address.town || "Unknown");
          } catch (error) {
            setLocation("Location not found");
          }
        },
        () => {
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Left Section: Logo and Location in Column */}
        <div className="d-flex flex-row align-items-center">
          <a href="/">
            <img src={Sybol} alt="Symbol" className="w-16 h-16 object-cover rounded-lg" />
          </a>
          <div className="location-container d-flex align-items-center mt-1">
            <FaMapMarkerAlt color="rgb(255, 87, 51)" size={18} />
            <span className="fw-bold ms-2"> {location}</span>
          </div>
        </div>

        {/* Right Section: Offcanvas Button */}
<div>


 <p>jhsd</p>

</div>
       <div>
  <button
          className="navbar-toggler"
          type="button"
          onClick={toggleOffCanvas}
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu */}
        <div className={`offcanvas offcanvas-end ${isOffCanvasOpen ? "show d-block" : ""}`} id="offcanvasDarkNavbar">
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
                <a className="nav-link" href="/profile">
                  Profile
                </a>
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
      

      </div>
    </nav>
  );
}

export default Navbar;
