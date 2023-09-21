import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList'; // Make sure to import MovieList component
import moviesData from './movies-2020s.json';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SeatSelection from './components/SeatSelection/SeatSelection';
import Registration from './components/Registration/Registration';
import SignIn from './components/SignIn/SignIn'; 
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';
import EditProfile from './components/EditProfile/EditProfile';


function App() {
  console.log(moviesData);
  return (
    
    <Router>
      <div>
        <NavBar movieData={moviesData} />
     
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/Seats" element={<SeatSelection />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;