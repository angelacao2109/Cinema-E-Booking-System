import React from 'react';
import { Outlet } from 'react-router-dom';  
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
} from './AdminNavElements';

const AdminNavBar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
            <NavLink to='/admin'>DashBoard</NavLink>   
            <NavLink to='/admin/editmovies'>Movies</NavLink>
            <NavLink to='/admin/editpromo'>Promotions</NavLink>
            <NavLink to='/admin/edituser'>Users</NavLink>
        </NavMenu>
        <NavBtn>
            <NavLink to='/admin/profile'>Profile</NavLink> 
        </NavBtn>
      </Nav>
      <Outlet />  
    </>
  );
};

export default AdminNavBar;
