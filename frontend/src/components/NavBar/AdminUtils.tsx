import React from 'react';
import { Link } from 'react-router-dom';

const AdminUtilitiesDropdown = () => {
  return (
    <div className="admin-utilities-dropdown">
      <button className="dropdown-button">Admin Utilities</button>
      <div className="dropdown-content">
        <Link to="/admin/moviespage" className="dropdown-link">Edit Movies</Link>
        <Link to="/admin/promopage" className="dropdown-link">Edit Promotions</Link>
        <Link to="/admin/edituser" className="dropdown-link">Edit Users</Link>
      </div>
    </div>
  );
};

export default AdminUtilitiesDropdown;