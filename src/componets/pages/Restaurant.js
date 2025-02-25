import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import delete icon

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/get/admin');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Failed to load restaurants.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token')?.trim();
    if (!token) {
      setError('Unauthorized: Please log in first.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:7000/api/admin',
        { name, location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(response.data.message);
      setName('');
      setLocation('');
      
      fetchRestaurants();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error:", error.response?.data);
      setError(error.response?.data?.message || 'Error adding restaurant');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')?.trim();
    if (!token) {
      setError('Unauthorized: Please log in first.');
      return;
    }

    try {
      await axios.delete(`http://localhost:7000/api/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Restaurant deleted successfully');
      fetchRestaurants();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setError('Failed to delete restaurant.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Add a New Restaurant</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card p-4 shadow-sm mt-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Restaurant
          </button>
        </form>
      </div>

      <h3 className="mt-4">Restaurant List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    <FaTrash /> {/* Delete Icon */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No restaurants available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddRestaurant;
