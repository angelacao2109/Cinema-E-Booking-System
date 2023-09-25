import React from 'react';
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
            <NavLink to='/' activeStyle>
                Dash
            </NavLink>
            <NavLink to='/editmovies' activeStyle>
                Movies
            </NavLink>
            <NavLink to='/editpromo' activeStyle>
                Promotions
            </NavLink>
            <NavLink to='/edituser' activeStyle>
                Users
            </NavLink>
            </NavMenu>
            <NavBtn>
            <NavLink to='/profile'>Profile</NavLink>
            </NavBtn>
      </Nav>
    </>
  );
};
  
export default AdminNavBar;