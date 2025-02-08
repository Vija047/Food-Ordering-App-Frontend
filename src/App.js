import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Login from "./componets/pages/Login"
import "bootstrap/dist/css/bootstrap.min.css";
// import Profile from "./componets/pages/profile";
// import './index.css'
function App() {
 

  return (
    <Router>
      <div className="App">
   
 <Navbar/>
        <Routes>
     
        <Route path="/login" element={<Login />} />
       {/* <Route path="/profile" element={<Profile/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
