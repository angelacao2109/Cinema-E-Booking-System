import React from "react";
import "./Home.css"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="nav">
      <div><button><Link to="/">HOME</Link></button></div>
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li>
          <button>Help</button>
        </li>
        <li>
          <button>Showtimes</button>
        </li>
        <li>
          <button><Link to="/registration"> Sign Up</Link></button>
        </li>
        <li>
          <button><Link to="/profile">Profile</Link></button>
        </li>
        
        
      </ul>
    </div>
  );
}

export default Home;