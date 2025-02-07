import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Login from "./componets/pages/Login"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// import './index.css'
function App() {
 

  return (
    <Router>
      <div className="App">
 <Navbar/>
        <Routes>
     
        <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
