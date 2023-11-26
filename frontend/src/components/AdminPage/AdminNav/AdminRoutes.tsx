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

// Ensure these handler functions are defined or imported
const handleAddMovie = (movie) => { /* ... */ };
const handleEditMovie = (movie) => { /* ... */ };
const handleEditPromo = (promo) => { /* ... */ };

const AdminRoutes = () => {
    return (
        <>
            <AdminNavBar />
            <Routes>
                
                <Route path="/admin/moviespage" element={<MoviesPage />} />
                <Route path="/admin/addmovie" element={<AddMovie onAddMovie={handleAddMovie} />} />
                <Route path="/admin/editmovie/:id" element={<EditMovie onEditMovie={handleEditMovie} />} />
                <Route path="/admin/movieinfo/:id" element={<MovieInfo />} />
                <Route path="/admin/promopage" element={<PromoPage />} />
                <Route path="/admin/addpromo" element={<AddPromo />} />
                <Route path="/admin/editpromo/:id" element={<EditPromo onEditPromo={handleEditPromo} />} />
                <Route path="/admin/edituser" element={<EditUser />} />
           
            </Routes>
        </>
    );
};

export default AdminRoutes;
