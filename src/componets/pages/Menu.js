import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Menu = ({ restaurantId, addToCart }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/getmenu/${restaurantId}`);
        setItems(response.data.menuItems || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  const filteredItems = items.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-center text-muted mt-4">🍽️ Loading menu...</p>;
  if (error)
    return <p className="text-center text-danger mt-4">❌ Error: {error}</p>;

  return (
    <div className="container mt-5">
      {/* Title */}
      <h2 className="text-center mb-4 text-primary fw-bold">📜 Menu</h2>

      {/* Search Box */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="🔍 Search food..."
            className="form-control shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="row">
        {filteredItems.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              {/* Food Image */}
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="card-img-top rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              {/* Food Details */}
              <div className="card-body text-center">
                <h5 className="card-title text-dark fw-bold">{item.name}</h5>
                <p className="card-text text-muted fs-5">₹{item.price}</p>
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="btn btn-primary w-100 fw-semibold"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
