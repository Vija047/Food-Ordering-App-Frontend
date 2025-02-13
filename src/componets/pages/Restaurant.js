import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/getadmin");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch restaurants");
        }

        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Function to add a new restaurant (admin only)
  const addRestaurant = async () => {
    const token = getAuthToken(); // Get token from localStorage

    if (!token) {
      setError("No authentication token found! Please log in.");
      return;
    }

    try {
      setSubmitted(true); // Show "Submitted" state

      const res = await fetch("http://localhost:7000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in request
        },
        body: JSON.stringify({ name, cuisine, address }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Restaurant submission failed!");
      }

      setResponse(data);
      setError(null);

      setRestaurants([...restaurants, data.restaurant]);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setCuisine("");
        setAddress("");
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setResponse(null);
      console.error("Error submitting restaurant:", err);
      setSubmitted(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRestaurant();
  };

  return (
    <div>
      <h2>Restaurant List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <strong>{restaurant.name}</strong> - {restaurant.cuisine}, {restaurant.address}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Add New Restaurant</h2>
      {response && <p style={{ color: "green" }}>Restaurant added successfully!</p>}

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
        <button type="submit" disabled={isSubmitted}>
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RestaurantPage;
