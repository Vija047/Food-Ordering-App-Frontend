import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Login from "./componets/pages/Login"
// import Profile from "./componets/pages/profile"
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./componets/pages/home";
// import Restaurant from "./componets/pages/Restaurant";
import Menu from "./componets/pages/Menu";
function App() {

  return (
    <Router>
      <div className="App">
   
 <Navbar/>
     


        <Routes>
    
        <Route path="/login" element={<Login />} />
       </Routes>
        <Home/>
      </div>
    </Router>
  );
}

export default App;
