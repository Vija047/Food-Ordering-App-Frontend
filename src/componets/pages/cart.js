import React, { useState } from "react";

const ShoppingCart = () => {
    // Sample cart data
    const [cart, setCart] = useState([
        { id: 1, name: "Pi Pizza Oven", price: 469.99, quantity: 1, note: "Estimated Ship Date: June 6th" },
        { id: 2, name: "Grill Ultimate Bundle", price: 549.99, quantity: 1, note: "Not available separately" },
        { id: 3, name: "Starters (4 pack)", price: 0.00, quantity: 1 },
        { id: 4, name: "Charcoal Grill Pack", price: 0.00, quantity: 1 }
    ]);

    const [coupon, setCoupon] = useState("");
    const salesTaxRate = 0.10; // 10% sales tax

    // Handle quantity change
    const updateQuantity = (id, change) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        ));
    };

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const salesTax = subtotal * salesTaxRate;
    const grandTotal = subtotal + salesTax;

    return (
        <div className="container mt-5">
            <h2 className="text-center">Your Cart ({cart.length} items)</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <strong>{item.name}</strong>
                                    {item.note && <div className="text-danger small">({item.note})</div>}
                                </td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </td>
                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Summary */}
            <div className="card p-3 shadow-sm">
                <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
                <p><strong>Sales Tax (10%):</strong> ₹{salesTax.toFixed(2)}</p>
                
                {/* Coupon Input */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Coupon Code" 
                        value={coupon} 
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button className="btn btn-outline-primary mt-2">Apply Coupon</button>
                </div>

                <h4><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></h4>

                {/* Free Shipping Message */}
                {grandTotal > 1000 && <p className="text-success">🎉 Congrats, you are eligible for Free Shipping!</p>}

                {/* Checkout Button */}
                <button className="btn btn-success w-100">Check out</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
