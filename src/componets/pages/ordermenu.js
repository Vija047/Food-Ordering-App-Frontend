import { useEffect, useState } from "react";

const Menu = ({ restaurantId }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orderMessage, setOrderMessage] = useState("");

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`http://localhost:7000/api/${restaurantId}/menu`);
                if (!response.ok) {
                    throw new Error("No menu items found!");
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurantId]);

    const handleOrder = async (itemId) => {
        try {
            const response = await fetch("http://localhost:7000/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ restaurantId, itemId, quantity: 1 }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            setOrderMessage("Order placed successfully!");
            setTimeout(() => setOrderMessage(""), 3000); // Clear message after 3 seconds
        } catch (err) {
            setOrderMessage(`Error: ${err.message}`);
        }
    };

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Menu</h2>
            {orderMessage && <p style={{ color: "green" }}>{orderMessage}</p>}
            <ul>
                {menuItems.map((item) => (
                    <li key={item._id}>
                        <strong>{item.name}</strong> - ₹{item.price}
                        <button
                            onClick={() => handleOrder(item._id)}
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                        >
                            Order
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
