import React from 'react';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

type NavBarProps = {
    movieData: any[];
};

function NavBar({ movieData }: NavBarProps) {
    const JoinForm = () => (
        <div className="modalContent">
            <h2>Join Now</h2>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('User details submitted. Integrate with backend or further functionality.');
            }}>
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="date" placeholder="Birthday" required />
                <input type="password" placeholder="Password" required />
                <input type="tel" placeholder="Phone Number" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    return (
        <nav className="navbar">
            <div className="leftLinks">
                <a href="/" className="link">Home</a>
                <SearchBar placeholder="Search..." data={movieData} />
            </div>
            <div className="rightLinks">
                <a href="/movies-playing" className="link">Movies Playing</a>
                <a href="/movies-coming-soon" className="link">Movies Coming Soon</a>
                <a href="/showtime" className="link">Showtime</a>
                <div className="accountSection">
                    <span>Account</span>
                    <div className="accountLinks">
                        <a href="#" className="accountLink">Sign In</a>
                        <Popup trigger={<a href="joinNow.html" className="accountLink">Join Now</a>} position="right center">
                            <JoinForm />
                        </Popup>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
