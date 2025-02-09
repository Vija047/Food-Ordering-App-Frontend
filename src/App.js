import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Login from "./componets/pages/Login"
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./componets/pages/home";
// import Menu from "./componets/pages/Menu";
// import Profile from "./componets/pages/profile";
// import './index.css'
function App() {
  
// const restaurantId="67a4e393de8af85f1adefdce";
  return (
    <Router>
      <div className="App">
   
 <Navbar/>
 {/* <Menu restaurantId={restaurantId}/> */}
       <Home/>
        <Routes>
     
        <Route path="/login" element={<Login />} />
       {/* <Route path="/profile" element={<Profile/>}/> */}
       {/* <Route path="/menu" element={<Menu />} /> */} 
       {/* <Route path="/" element={<Home />} /> */}

       </Routes>
       
      </div>
    </Router>
  );
}

export default App;
