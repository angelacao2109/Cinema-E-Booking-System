import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AdminNavBar } from './AdminNavBar';

import EditMovies from '../EditMovies/EditMovies';
import EditPromo from '../EditPromo/EditPromo';
import EditUser from '../EditUser/EditUser';

// TODO ADD ADMIN AUTH

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
}

export default AdminRoutes;