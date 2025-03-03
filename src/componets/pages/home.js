import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../footer";
// Import multiple images
import foodDeliveryImg1 from "../../assets/homepage.jpg";
import foodDeliveryImg2 from "../../assets/Chicken-Biryani.jpg";
import foodDeliveryImg3 from "../../assets/mattar-paneer.jpg";
import foodDeliveryImg4 from "../../assets/Idli Dosa Batter.jpg";
import foodDeliveryImg5 from "../../assets/Easy-Fried-Rice.webp";
import foodDeliveryImg6 from "../../assets/ThaiFriedRice.jpg";
import foodDeliveryImg7 from "../../assets/Easy-Fried-Rice.webp";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const images = [
    { src: foodDeliveryImg1, name: "Home Special" },
    { src: foodDeliveryImg2, name: "Chicken Biryani" },
    { src: foodDeliveryImg3, name: "Mattar Paneer" },
    { src: foodDeliveryImg4, name: "Idli Dosa Batter" },
    { src: foodDeliveryImg5, name: "Easy Fried Rice" },
    { src: foodDeliveryImg6, name: "Thai Fried Rice" },
    { src: foodDeliveryImg7, name: "Easy Fried Rice" },
  ];

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Content */}
        <div className="col-md-6">
          <h5 className="text-success fw-bold">SIMPLE WAY TO MAKE ORDER</h5>
          <h1 className="fw-bold">
            Delivered Your <span className="text-warning">Food</span> in {" "}
            <span className="text-warning">30 minutes.</span>
          </h1>
          <p className="text-muted">Online Food Home Delivery Services in India.</p>

          <div className="mt-4">
            <button
              onClick={() => navigate("/menu")}
              className="btn btn-warning me-3 px-4 py-2"
            >
              Order Menu
            </button>
            <button className="btn btn-outline-warning px-4 py-2">
              Table Reservation
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="col-md-6 mt-4 d-flex justify-content-center">
          <motion.div
            className="input-group w-100 shadow-sm"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              maxWidth: "600px",
              border: "2px solid #ffcc80" // Light orange border
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.input
              type="text"
              className="form-control border-0 px-4 py-3"
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: "10px 0 0 10px", fontSize: "1.2rem" }}
              whileFocus={{ scale: 1.05, borderColor: "#ffcc80" }}
            />
            <motion.button
              className="btn btn-warning"
              style={{ borderRadius: "0 10px 10px 0", fontSize: "1.2rem", padding: "0 20px" }}
              whileHover={{ scale: 1.1 }}
            >
            Search
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side Image Slider */}
        <div className="col-md-10 text-center mt-4 mt-md-0 overflow-hidden">
          <motion.div
            className="d-flex"
            drag="x"
            dragConstraints={{ right: 0, left: -800 }}
            initial={{ x: 0 }}
            animate={{ x: -100 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {filteredImages.map((img, index) => (
              <motion.img
                key={index}
                src={img.src}
                alt={img.name}
                className="img-thumbnail mx-2"
                style={{ width: "250px", height: "250px", borderRadius: "10px" }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Category Slider */}
      <motion.div
        className="d-flex justify-content-center gap-3 mt-5 flex-wrap"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["Burger", "Beverage", "Chicken Pasta", "Dinner", "Food"].map(
          (category, index) => (
            <motion.button
              key={index}
              className="btn btn-outline-secondary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          )
        )}
      </motion.div>

      {/* ✅ Footer is placed correctly here */}
      <Footer />
    </div>
  );
};

export default Home;