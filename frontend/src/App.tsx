import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList'; 
import moviesData from './movies-2020s.json';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SeatSelection from './components/SeatSelection/SeatSelection';
import Registration from './components/Registration/Registration';
import SignIn from './components/SignIn/SignIn'; 
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';
import EditProfile from './components/EditProfile/EditProfile';
import SelectTicket from './components/SelectTicket/SelectTicket';
import Checkout from './components/Checkout/Checkout';
import Confirmation from './components/Confirmation/Confirmation';
import OrderHistory from './components/OrderHistory/OrderHistory';
import EditPromo from './components/AdminPage/Promotions/EditPromo';
import EditUser from './components/AdminPage/EditUser/EditUser';
import AdminNavBar from './components/AdminPage/AdminNav/AdminNavBar';
import AdminRoutes from './components/AdminPage/AdminNav/AdminRoutes';
import { Movie} from "./components/types";
import ResetPasswordPostLink from './components/ResetPasswordPostLink/ResetPasswordPostLink';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import axios from "axios";

function App() {

  const [showtimeID, setShowtimeID] = useState<number | null>(null); // added

  const logout = () => {
    document.cookie = 'authToken=; Max-Age=0';
    document.cookie = 'userEmail=; Max-Age=0';
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserRole('guest');
  };

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

  const [userRole, setUserRole] = useState('guest'); 

  useEffect(() => {
      setIsLoggedIn(getCookie('authToken') !== null);
  }, []);
  
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const refetchMovies = () => {
    setShouldRefetch(prevState => !prevState);
  };

  const getIsAdmin = async () => {
    try {
      const admin_response = await axios.get('http://localhost:8080/api/user',          
      {headers: {
        'Authorization': getCookie('authToken')
    }});
    if (admin_response.status == 200){
      if (admin_response.data.roles[1] == "ROLE_ADMIN"){
        console.log("Is Admin")
        return true
      }
    } else {
      return false
    }
    } catch (error: any) {
      console.log(error)
    }
  };

  const [isAdmin, setIsAdmin] = useState(getIsAdmin());

  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const foundEmail = getCookie('userEmail');
    setUserEmail(foundEmail ?? null);
}, [isLoggedIn]);


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
        isAdmin
      />
     
      <AppRoutes
          searchResults={searchResults}
          handleTicketChange={handleTicketChange}
          ticketCount={ticketCount}
          setIsAdmin={setIsAdmin}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedInUserEmail={setLoggedInUserEmail}
          refetchMovies={refetchMovies}
          loggedInUserEmail={loggedInUserEmail}
          onLogout={logout}
          showtimeID={showtimeID}
        />
      </div>
    </Router>
  );
}

const AppRoutes = ({
  searchResults,
  handleTicketChange,
  ticketCount,
  setIsAdmin,
  setIsLoggedIn,
  setLoggedInUserEmail,
  refetchMovies,
  loggedInUserEmail,
  onLogout,
  showtimeID
}) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    
          <Routes>
          {isAdminPath ? (
           <Route path="/admin/*" element={<AdminRoutes onLogout={onLogout} />} />
          ) : (
            <>
          <Route path="/" element={<MovieList searchResults={searchResults} />} />
          <Route path="/select-ticket/:showtimeID" element={<SelectTicket onTicketChange={handleTicketChange} />} />
          <Route path="/seats/:showtimeID" element={<SeatSelection maxSeats={ticketCount} showtimeID={showtimeID} />} />
          <Route path="/checkout/:showtimeID" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/register" element={<Registration />} />
   
          <Route path="/signin" element={<SignIn setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} onSuccessfulLogin={setLoggedInUserEmail} refetchMovies={refetchMovies} />} />


          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/change-password" element={<ResetPasswordPostLink />} />  
          <Route path="/edit-profile" element={<EditProfile userEmail={loggedInUserEmail} />} />
          <Route path="/orderhistory" element={<OrderHistory />} /> 
          </>
      )}
    </Routes>
  );
};

export default App;


//<Route path="/tickets" element={<SelectTicket onTicketChange={handleTicketChange} />} />