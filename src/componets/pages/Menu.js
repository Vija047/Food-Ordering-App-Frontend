import { useEffect, useState } from "react";

const Menu = ({ restaurantId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]); // Fetch only when restaurantId is available

  const fetchMenu = async () => {
    try {
      console.log("Fetching menu for Restaurant ID:", restaurantId);

      const response = await fetch(`http://localhost:7000/api/admin/${restaurantId}/menu`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Menu API Response:", data);

      setMenuItems(data.menuItems || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Menu</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading menu items...</p>
      ) : menuItems.length === 0 ? (
        <p className="text-center text-red-500">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
