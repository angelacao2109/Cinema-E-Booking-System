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
import SelectTicket from './components/SelectTicket/SelectTicket';
import Checkout from './components/Checkout/Checkout';
import Confirmation from './components/Confirmation/Confirmation';
import Summary from './components/Summary/Summary';
import AdminNavBar from './components/AdminPage/AdminNav/AdminNavBar';
import Dash from './components/AdminPage/Dash/Dash';
import EditMovies from './components/AdminPage/EditMovies/EditMovies';
import EditPromo from './components/AdminPage/EditPromo/EditPromo';
import EditUser from './components/AdminPage/EditUser/EditUser';


function App() {
  console.log(moviesData);

  const [ticketCount, setTicketCount] = useState<number>(0);

  const handleTicketChange = (count: number) => {
    setTicketCount(count);
  };
    
    return (
      <Router>
        <div>
          <NavBar movieData={moviesData} />
         
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/tickets" element={
              <div className="app-container">
                <SelectTicket onTicketChange={handleTicketChange} />
              </div>
            } />
            <Route path="/seats" element={<SeatSelection maxSeats={ticketCount} />} />
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

//<Route path="/tickets" element={<SelectTicket onTicketChange={handleTicketChange} />} />