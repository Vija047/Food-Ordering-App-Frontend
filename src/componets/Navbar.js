import React, { useState, useEffect } from "react";

function Navbar() {
  const [isoffdishdash, setoffdishdash] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(""); // For error handling

  // Toggle function for offcanvas menu
  const toggleofdishdash = () => {
    setoffdishdash(!isoffdishdash);
  };

  useEffect(() => {
    fetch("http://localhost:7000/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Check if the response is JSON
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new Error("Response is not JSON");
      })
      .then((data) => {
        setData(data.at || ""); // Use data from backend if available
        setLoading(false);
      })
      .catch((error) => {
        setError("Fetch error: " + error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <nav className="navbar navbar bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            DishDash
          </a>

          <form className="d-flex mt-2" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleofdishdash}
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas Section with Dynamic State */}
          <div
            className={`offcanvas offcanvas-end text-bg ${
              isoffdishdash ? "show" : ""
            }`}
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
              <button
                type="button"
                className="btn-close btn-close"
                onClick={toggleofdishdash}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
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
