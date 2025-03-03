import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderWithCart = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]); // ✅ Cart state added

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api/get/admin");
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    const handleRestaurantClick = async (restaurant) => {
        setSelectedRestaurant(restaurant);
        setMenuItems([]); // Clear menu before fetching new items
        try {
            const response = await axios.get(`http://localhost:7000/api/getmenu/${restaurant._id}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    // ✅ Add to Cart Function
    const handleAddToCart = (item) => {
        setCart([...cart, item]); // Adds item to cart
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {restaurants.length === 0 ? (
                    <p className="text-center text-muted">No restaurants available.</p>
                ) : (
                    restaurants.map((restaurant) => (
                        <div key={restaurant._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0" onClick={() => handleRestaurantClick(restaurant)}>
                                <img src={restaurant.image} alt={restaurant.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Menu Section */}
            {selectedRestaurant && (
                <div className="mt-5">
                    <h3 className="text-center text-success">🍽️ {selectedRestaurant.name} - Menu</h3>
                    <div className="row">
                        {menuItems.length === 0 ? (
                            <p className="text-center text-muted">No menu items available.</p>
                        ) : (
                            menuItems.map((item) => (
                                <div key={item._id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm border-0">
                                        <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="text-muted">₹{item.price}</p>
                                            <button className="btn btn-sm btn-primary" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Cart Section */}
            {cart.length > 0 && (
                <div className="mt-5">
                    <h3 className="text-center text-warning">🛒 Your Cart</h3>
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name} - ₹{item.price}
                                <span className="badge bg-success">{selectedRestaurant?.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderWithCart;
