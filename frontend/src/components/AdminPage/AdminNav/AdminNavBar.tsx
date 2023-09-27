import React from 'react';
import { Outlet, Routes, Route } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn } from './AdminNavElements';
import Dash from '../Dash/Dash';
import EditMovies from '../EditMovies/EditMovies';
import EditPromo from '../EditPromo/EditPromo';
import EditUser from '../EditUser/EditUser';

const navLinks = [
  { to: '/admin', label: 'DashBoard' },
  { to: '/admin/editmovies', label: 'Movies' },
  { to: '/admin/editpromo', label: 'Promotions' },
  { to: '/admin/edituser', label: 'Users' }
];

const AdminNavBar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
          ))}
        </NavMenu>
        <NavBtn>
          <NavLink to='/admin/profile'>Profile</NavLink>
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
                <Route index element={<Dash />} />
                <Route path="editmovies" element={<EditMovies />} />
                <Route path="editpromo" element={<EditPromo />} />
                <Route path="edituser" element={<EditUser />} />
            </Route>
        </Routes>
    );
}

export { AdminNavBar, AdminRoutes };
