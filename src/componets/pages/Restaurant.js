import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setSubmitted] = useState(false);
  const [menuMessage, setMenuMessage] = useState("");
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

  const addRestaurant = async () => {
    const token = getAuthToken();

    if (!token) {
      setError("No authentication token found! Please log in.");
      return;
    }

    try {
      setSubmitted(true);
      const res = await fetch("http://localhost:7000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      setSubmitted(false);
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();

    if (!selectedRestaurant) {
      setError("Please select a restaurant first.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:7000/api/admin/${selectedRestaurant}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, price }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add menu item.");
      }

      setMenuMessage("Menu item added successfully!");
      setMenuName("");
      setPrice("");
    } catch (err) {
      setError(err.message);
      setMenuMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Restaurant List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mb-4">
        {restaurants.map((restaurant) => (
          <li key={restaurant._id} className="list-group-item">
            <strong>{restaurant.name}</strong> - {restaurant.cuisine}, {restaurant.address}
          </li>
        ))}
      </ul>

      <hr />

      <h2 className="text-center">Add New Restaurant</h2>
      {response && <p className="text-success">Restaurant added successfully!</p>}

      <form className="row g-3" onSubmit={(e) => { e.preventDefault(); addRestaurant(); }}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </form>

      <hr />

      <h2 className="text-center">Add Menu Item</h2>
      {menuMessage && <p className="text-success">{menuMessage}</p>}
      {error && <p className="text-danger">{error}</p>}

      <form className="row g-3" onSubmit={addMenuItem}>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Menu Item Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <select
            className="form-control"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            required
          >
            <option value="">Select a Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success">Add Menu Item</button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantPage;
