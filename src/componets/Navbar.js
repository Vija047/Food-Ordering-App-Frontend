import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon
import axios from "axios"; // For API calls
import Sybol from "../assets/icons8-d-64.svg";
import Cart from "../assets/icart.svg";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Searching...");
  const [query, setQuery] = useState(""); // New state for search input
  const [manualLocation, setManualLocation] = useState(null); // Manual search result

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

  // Fetch user's current location automatically
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

            if (data && data.address) {
              setLocation(data.address.city || data.address.town);
            } else {
              setLocation("Location not found");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location not found");
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  // Fetch location based on search query (Manual Location Search)
  const fetchManualLocation = async () => {
    if (!query) return;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&limit=1`;

    try {
      const response = await axios.get(url);
      if (response.data.length === 0) {
        setError("Location not found.");
        setManualLocation(null);
        return;
      }
      setManualLocation(response.data[0]);
      setError("");
    } catch (err) {
      setError("Error fetching location data.");
      setManualLocation(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleProfile = () => navigate("/profile");

  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section: Logo and Location */}
        <div className="d-flex flex-row align-items-center">
          <a href="/">
            <img
              src={Sybol}
              alt="Symbol"
              className="w-16 h-16 object-cover rounded-lg"
            />
          </a>
          <div className="location-container d-flex align-items-center mt-1 ms-3">
            <FaMapMarkerAlt color="rgb(255, 87, 51)" size={18} />
            <span className="fw-bold ms-2">{manualLocation ? manualLocation.display_name : location}</span>
          </div>
        </div>

        {/* Location Search Input */}
        <div className="d-flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search location..."
            className="form-control me-2"
          />
          <button className="btn btn-primary" onClick={fetchManualLocation}>
            Search
          </button>
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
