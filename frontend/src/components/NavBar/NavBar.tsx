import React, { useState, useEffect } from 'react';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import EditProfile from '../EditProfile/EditProfile';
import EditMovies from '../AdminPage/EditMovies/EditMovies.jsx';
import EditPromo from '../AdminPage/EditPromo/EditPromo';
import EditUser from '../AdminPage/EditUser/EditUser';
import Dash from '../AdminPage/Dash/Dash';
import { AdminNavBar, AdminRoutes } from '../AdminPage/AdminNav/AdminNavBar';


type NavBarProps = {
    movieData: any[];
};

function NavBar({ movieData }: NavBarProps) {
    const [rememberMe, setRememberMe] = useState(false);
    const [registerForPromotions, setRegisterForPromotions] = useState(false); 
    const [moviesPlaying, setMoviesPlaying] = useState<any[]>([]);
    const [moviesComingSoon, setMoviesComingSoon] = useState<any[]>([]);
    const fetchMovies = (endpoint: string, setMovies: React.Dispatch<React.SetStateAction<any[]>>) => {
        axios.get(endpoint)
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error(`Error fetching movies from ${endpoint}:`, error);
            });
    }
    useEffect(() => {
        fetchMovies('http://localhost:8080/api/movies-playing', setMoviesPlaying);
        fetchMovies('http://localhost:8080/api/movies-coming-soon', setMoviesComingSoon);
    }, []); 



    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }
    
    const handlePromotionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForPromotions(event.target.checked);
    }

    

    const location = useLocation();
        

    return (
        location.pathname.startsWith('/admin') ? (
            <AdminRoutes/>
            ) : (
           <nav className="navbar">
                <div className="leftLinks">
                    <a href="/" className="link">Home</a>
                    <SearchBar placeholder="Search..." />
                </div>
                <div className="rightLinks">
                <Link to="/movies-playing" className="link">Movies Playing</Link>
                    <Link to="/movies-coming-soon" className="link">Movies Coming Soon</Link>
                    <Link to="/admin" className="link">Admin</Link>
                    <Link to="/edit-profile" className="link">Edit Profile</Link>
                    <Link to="/orderhistory" className="link">Order History</Link>
                    <Link to="/select-ticket" className="link">Select Ticket</Link>
                    <div className="accountSection">
                        <span>Account</span>
                        <div className="accountLinks">
                            <Link to="/signin" className="accountLink">Sign In</Link>
                            <Link to="/register" className="accountLink">Join Now</Link> 
                        </div>
                    </div>
                </div>
            </nav>
            )
    );
}

export default NavBar;