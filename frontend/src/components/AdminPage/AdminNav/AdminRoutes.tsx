import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import MoviesPage from '../Movies/MoviesPage';
import AddMovie from '../Movies/AddMovie';
import EditMovie from '../Movies/EditMovie';
import MovieInfo from '../Movies/MovieInfo';
import PromoPage from '../Promotions/PromoPage';
import AddPromo from '../Promotions/AddPromo';
import EditPromo from '../Promotions/EditPromo';
import EditUser from '../EditUser/EditUser';
import Showtime from '../Showtimes/Showtimes'; // Imported Showtime page
import AddShowtime from '../Showtimes/AddShowtime'; // Imported AddShowtime page
import EditShowtime from '../Showtimes/EditShowtime'; // Imported EditShowtime page


// Ensure these handler functions are defined or imported
const handleAddMovie = (movie) => { /* ... */ };
const handleEditMovie = (movie) => { /* ...*/ };
const handleEditPromo = (promo) => { /* ... */ };
const handleAddShowtime = (showtime) => { /* ... */ }; // AddShowtime handler
const handleEditShowtime = (showtime) => { /* ... */ }; // EditShowtime handler

const AdminRoutes = ({ onLogout }) => {
    return (
        <>
            <Routes>

            <Route path="moviespage" element={<MoviesPage />} />
            <Route path="addmovie" element={<AddMovie onAddMovie={handleAddMovie} />} />
            <Route path="editmovie/:id" element={<EditMovie onEditMovie={handleEditMovie} />} />
            <Route path="movieinfo/:id" element={<MovieInfo />} />
            <Route path="promopage" element={<PromoPage />} />
            <Route path="addpromo" element={<AddPromo />} />
            <Route path="editpromo/:id" element={<EditPromo onEditPromo={handleEditPromo} />} />
            <Route path="edituser" element={<EditUser />} />
            {/* Added Showtime routes */}
            <Route path="showtime" element={<Showtime />} />
            <Route path="addshowtime" element={<AddShowtime onAddShowtime={handleAddShowtime}/>} />
            {/*<Route path="editshowtime" element={<EditShowtime onEditShowtime={handleEditShowtime}/>} />*/}

            </Routes>
        </>
    );
};

export default AdminRoutes;
// <AdminNavBar onLogout={onLogout} />