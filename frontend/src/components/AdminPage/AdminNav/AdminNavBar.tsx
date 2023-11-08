import React from "react";
import { Outlet, Routes, Route, useNavigate, } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./AdminNavElements";

import EditMovies from "../EditMovies/EditMovies";
import EditPromo from "../EditPromo/EditPromo";
import EditUser from "../EditUser/EditUser";

const navLinks = [
 
  { to: "/admin/editmovies", label: "Movies" },
  { to: "/admin/editpromo", label: "Promotions" },
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
    <>
      <Nav>
        <Bars />
        <NavMenu>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          
        </NavMenu>
        <NavBtn>
        <button onClick={handleBack}>Back</button>
          
          <NavLink to="/admin/profile">Profile</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </NavBtn>
      </Nav>
      <Outlet />
    </>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminNavBar />}>

        <Route path="editmovies" element={<EditMovies />} />
        <Route path="editpromo" element={<EditPromo />} />
        <Route path="edituser" element={<EditUser />} />
      </Route>
    </Routes>
  );
};

export { AdminNavBar, AdminRoutes };