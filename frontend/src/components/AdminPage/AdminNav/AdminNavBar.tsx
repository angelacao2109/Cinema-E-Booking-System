import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './AdminNavbar.css';

const navLinks = [
  { to: "/admin/moviespage", label: "Movies" },
  { to: "/admin/promopage", label: "Promotions" },
  { to: "/admin/edituser", label: "Users" }, 
];


const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className="navbar-link">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="right-section">
        <button onClick={handleBack} className="navbar-button">Back</button>
        <Link to="/admin/profile" className="navbar-link">Profile</Link>
        <button onClick={handleLogout} className="navbar-button">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavBar;