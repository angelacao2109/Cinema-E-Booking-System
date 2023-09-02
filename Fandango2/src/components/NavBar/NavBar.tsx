import React, { useState } from 'react';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

type NavBarProps = {
    movieData: any[];
};

function NavBar({ movieData }: NavBarProps) {
    const [rememberMe, setRememberMe] = useState(false);
    const [registerForPromotions, setRegisterForPromotions] = useState(false); 

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }
    
    const handlePromotionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForPromotions(event.target.checked);
    }

    const ForgotPasswordForm = () => (
        <div className="modalContent">
            <h2>Forgot Password</h2>
            <p>Please enter your email, and we will send you a link to reset your password.</p>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
    
                fetch('/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log('Reset link sent to email.');
                    } else {
                        console.log('Error sending reset link.');
                    }
                });
            }}>
                <input type="email" name="email" placeholder="Email" required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );

    const SignInForm = () => (
        <div className="modalContent">
            <h2>Sign In</h2>
            {/* ... (keep the rest of this component as it is) */}
            <div className="signInFooter">
                <div className="rememberSection">
                    {/* ... (keep the checkbox related code) */}
                </div>
                <Popup 
                    trigger={<a href="#" className="forgotPassword">Forgot Password?</a>} 
                    onOpen={() => document.body.style.overflowY = 'hidden'}
                    onClose={() => document.body.style.overflowY = 'scroll'}
                >
                    <ForgotPasswordForm />
                </Popup>
            </div>
            <button type="submit">Sign In</button>
        </div>
    );

    const JoinForm = () => (
        <div className="modalContent">
            <h2>Join Now</h2>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('User details submitted. Integrate with backend or further functionality.');
                console.log('Register for promotions:', registerForPromotions);
            }}>
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="date" placeholder="Birthday" required />
                <input type="password" placeholder="Password" required />
                <input type="tel" placeholder="Phone Number" required />
            
                <label className="promotionSection">
    Register for Promotions
    <input 
        type="checkbox" 
        id="promotions" 
        checked={registerForPromotions}
        onChange={handlePromotionChange}
    />
</label>
                <button type="submit">Join</button>
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
                    <Popup 
    trigger={<a className="accountLink">Sign In</a>}
    onOpen={() => document.body.style.overflowY = 'hidden'}
    onClose={() => document.body.style.overflowY = 'scroll'}
>
    <SignInForm />
</Popup>
<Popup 
    trigger={<a className="accountLink">Join Now</a>}
    onOpen={() => document.body.style.overflowY = 'hidden'}
    onClose={() => document.body.style.overflowY = 'scroll'}
>

    <JoinForm />
</Popup>
                    </div>
                </div>
            </div>
        </nav>
    );
}



export default NavBar;

