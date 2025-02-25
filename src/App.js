import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./componets/Navbar";
import Login from "./componets/pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurant from "./componets/pages/Restaurant";
import Home from "./componets/pages/home";
import Loader from "./componets/loader";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the delay as needed
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            {/* <div className="spinner-border text-#FFFF00" role="status"> */}
              <span className="visually-hidden">Loading...</span>
              <Loader/>
            {/* </div> */}
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/restaurant" element={<Restaurant />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
