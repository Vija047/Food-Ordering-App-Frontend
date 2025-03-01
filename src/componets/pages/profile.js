import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthday: "",
    phone: "",
    instagram: "",
    password: "",
    image: null, // Store selected image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:7000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            name: response.data.name || "",
            email: response.data.email || "",
            birthday: response.data.birthday || "",
            phone: response.data.phone || "",
            instagram: response.data.instagram || "",
            password: "",
            image: response.data.image || null,
          }));

          setImagePreview(response.data.image || "/default-profile.png"); // Default image
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch profile. Please log in again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleBirthdayChange = (e) => {
    setProfile({ ...profile, birthday: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(phoneNumber)) {
      setProfile({ ...profile, phone: phoneNumber });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="text-center">
          <label htmlFor="profileImageUpload" className="d-block">
            <div
              className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </label>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            className="d-none"
            onChange={handleImageUpload}
          />
          <h4>{profile.name}</h4>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mt-3">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-calendar"></i>
            </span>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={profile.birthday}
              onChange={handleBirthdayChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-phone"></i>
            </span>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={profile.phone}
              onChange={handlePhoneChange}
              disabled={!isEditing}
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary px-4"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
