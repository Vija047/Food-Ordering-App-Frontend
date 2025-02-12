import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

const Restaurant = () => {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = getAuthToken(); // Get token from localStorage

    if (!token) {
      setError("No authentication token found! Please log in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:7000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in request
        },
        body: JSON.stringify({ name, cuisine, address }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Restaurant submission failed!");
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
      navigate("/dashboard"); // Redirect after success
    } catch (err) {
      setError(err.message);
      setResponse(null);
      console.error("Error fetching data:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchData();
  };

  return (
    <div>
      <h2>Restaurant Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>

     
    </div>
  );
};

export default Restaurant;
