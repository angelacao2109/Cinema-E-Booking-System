import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList'; 
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
import OrderHistory from './components/OrderHistory/OrderHistory';
import Dash from './components/AdminPage/Dash/Dash';
import EditMovies from './components/AdminPage/EditMovies/EditMovies';
import EditPromo from './components/AdminPage/EditPromo/EditPromo';
import EditUser from './components/AdminPage/EditUser/EditUser';
import { AdminNavBar } from './components/AdminPage/AdminNav/AdminNavBar';
import AdminRoutes from './components/AdminPage/AdminNav/AdminRoutes';
import { Movie} from "./components/types";
import ResetPasswordPostLink from './components/ResetPasswordPostLink/ResetPasswordPostLink';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
function App() {
  console.log(moviesData);

  const [ticketCount, setTicketCount] = useState<number>(0);

  const handleTicketChange = (count: number) => {
    setTicketCount(count);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2 && parts[1]) {
        return parts[1].split(';')[0];
    }
    return null;
}


  const [isLoggedIn, setIsLoggedIn] = useState(getCookie('authToken') !== null);

  useEffect(() => {
      setIsLoggedIn(getCookie('authToken') !== null);
  }, []);
  
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);

    return (
      <Router>
        <div>
        <NavBar 
  isLoggedIn={isLoggedIn}
  setIsLoggedIn={setIsLoggedIn}
  movieData={moviesData} 
  searchQuery={searchQuery} 
  onSearchChange={setSearchQuery}
  onSearchResultsChange={setSearchResults}
/>

         
          <Routes>
          <Route path="/" element={<MovieList searchResults={searchResults} />} />
          <Route path="/select-ticket" element={<SelectTicket onTicketChange={handleTicketChange} />} />
          <Route path="/seats" element={<SeatSelection maxSeats={ticketCount} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/register" element={<Registration />} />
   
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} onSuccessfulLogin={setLoggedInUserEmail} />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/change-password" element={<ResetPasswordPostLink />} />  
          <Route path="/edit-profile" element={<EditProfile userEmail={loggedInUserEmail} />} />
          <Route path="/orderhistory" element={<OrderHistory />} /> 
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//<Route path="/tickets" element={<SelectTicket onTicketChange={handleTicketChange} />} />