import React from 'react';
import { Link } from 'react-router-dom';

const AdminUtilitiesDropdown = () => {
  return (
    <div className="admin-utilities-dropdown">
      {/* Changed button to link and is linked to nothing */}
      <Link to="" className="admin-dropdown-link">Admin Controls</Link> 
      <div className="dropdown-content">
        {/* Changed link titles */}
        <Link to="/admin/moviespage" className="dropdown-link">Manage Movies</Link>
        <Link to="/admin/promopage" className="dropdown-link">Manage Promos</Link>
        <Link to="/admin/edituser" className="dropdown-link">Manage Users</Link>

        {/* Added a manage showtime page */}
        <Link to="/admin/showtime" className="dropdown-link">Manage Showtimes</Link>

        {/* Added a manage tickets page */}
        <Link to="/admin/tickets" className="dropdown-link">Manage Tickets</Link>


      </div>
    </div>
  );
};

export default AdminUtilitiesDropdown;