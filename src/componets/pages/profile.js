import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Fetch from local storage when component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("useremail");

    if (storedName) setUsername(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Save updated user details to local storage
  const handleSave = () => {
    if (!username || !email) {
      alert("Please enter valid details.");
      return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("useremail", email);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg p-4" style={{ maxWidth: "400px", margin: "auto" }}>
        {/* <img
          className="rounded-circle mx-auto d-block"
          src="https://placehold.co/150"  // ✅ Updated Image URL
          alt="Profile"
          width="100"
          height="100"
        /> */}
        <div className="card-body">
          {!editMode ? (
            <>
              <h5 className="card-title">
                <FaUser className="text-danger me-2" />
                {username || "Guest"}
              </h5>
              <p className="card-text">
                <FaEnvelope className="text-danger me-2" />
                {email || "guest@gmail.com"}
              </p>
              <button className="btn btn-warning" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
