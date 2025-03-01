import { useNavigate } from "react-router-dom";
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
  const images = [
    foodDeliveryImg1,
    foodDeliveryImg2,
    foodDeliveryImg3,
    foodDeliveryImg4,
    foodDeliveryImg5,
    foodDeliveryImg6,
    foodDeliveryImg7,
  ]; // Array of images

  
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Content */}
        <div className="col-md-6">
          <h5 className="text-success fw-bold">SIMPLE WAY TO MAKE ORDER</h5>
          <h1 className="fw-bold">
            Delivered Your <span className="text-warning">Food</span> in{" "}
            <span className="text-warning">30 minutes.</span>
          </h1>
          <p className="text-muted">
            Online Food Home Delivery Services in India.
          </p>

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

        {/* Right Side Image Slider */}
        <div className="col-md-10 text-center mt-4 mt-md-0 overflow-hidden">
          <motion.div
            className="d-flex"
            drag="x"
            dragConstraints={{ right: 0, left: -800 }} // Limits drag range
            initial={{ x: 0 }}
            animate={{ x: -100 }} // Moves images automatically
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }} // Continuous loop
          >
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Food ${index + 1}`}
                className="img-thumbnail mx-2"
                style={{ width: "250px", height: "250px", borderRadius: "10px" }}
                whileHover={{ scale: 1.1 }} // Zoom effect on hover
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
