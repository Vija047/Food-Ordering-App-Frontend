import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const OrderWithCart = () => {
    const [cart, setCart] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);

    // Sample menu items (Replace with API call if needed)
    const menuItems = [
        { id: "1", name: "🍔 Burger", price: 100 },
        { id: "2", name: "🍕 Pizza", price: 200 },
        { id: "3", name: "🍝 Pasta", price: 150 },
    ];

    // Add item to cart
    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    // Remove item from cart
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    // Place an order
    const placeOrder = async () => {
        if (cart.length === 0) {
            alert("🛒 Your cart is empty!");
            return;
        }

        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
        const items = cart.map(item => ({ name: item.name, price: item.price }));

        try {
            const response = await axios.post("http://localhost:7000/api/orders", {
                restaurant: "65abc123xyz456", // Internal restaurant ID
                items,
                totalPrice
            });

            setOrderId(response.data.order._id);
            setCart([]); // Clear cart after placing order
            alert("✅ Order placed successfully! Your Order ID: " + response.data.order._id);
        } catch (error) {
            alert("❌ Error placing order");
        }
    };

    // Get order details
    const getOrderDetails = async () => {
        if (!orderId) {
            alert("📦 Enter a valid Order ID!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:7000/api/${orderId}`);
            const { _id, items, totalPrice, status } = response.data;

            setOrderDetails({ id: _id, items, totalPrice, status });
        } catch (error) {
            alert("❌ Error fetching order details");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">📜 Menu</h2>

            {/* Menu Items */}
            <div className="row">
                {menuItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text text-muted">₹{item.price}</p>
                                <button className="btn btn-success w-100" onClick={() => addToCart(item)}>
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Section */}
            <h2 className="text-center text-warning mt-5">🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} - ₹{item.price}
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>❌ Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-primary w-100 mt-3" onClick={placeOrder} disabled={cart.length === 0}>
                ✅ Place Order
            </button>

            {/* Order Retrieval */}
            <h2 className="text-center text-secondary mt-5">📦 Track Your Order</h2>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Order ID" 
                    value={orderId} 
                    onChange={(e) => setOrderId(e.target.value)} 
                />
                <button className="btn btn-info" onClick={getOrderDetails}>🔍 Find Order</button>
            </div>

            {/* Order Details */}
            {orderDetails && (
                <div className="card mt-4 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title text-success">📦 Order Details</h3>
                        <p><strong>Order ID:</strong> {orderDetails.id}</p>
                        <p><strong>Status:</strong> {orderDetails.status}</p>
                        <p><strong>Total Price:</strong> ₹{orderDetails.totalPrice}</p>
                        <h4>🍽 Items Ordered:</h4>
                        <ul className="list-group">
                            {orderDetails.items.map((item, index) => (
                                <li key={index} className="list-group-item">{item.name} - ₹{item.price}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderWithCart;
