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

    const ResetPasswordForm = () => {
        const [email, setEmail] = useState('');
        
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            fetch('/api/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('Reset link sent successfully.');
                } else {
                    console.log('Error sending reset link.');
                }
            });
        }
    
        return (
            <div className="modalContent">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button type="submit">Request Reset Link</button>
                </form>
            </div>
        );
    };
    
    
   
    const SignInForm = () => {
        const [isOpen, setIsOpen] = useState(false);
    
        const togglePopup = () => {
            setIsOpen(!isOpen);
        }
    
        return (
            <div className="modalContent">
                <h2>Sign In</h2>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    console.log('User credentials submitted. Integrate with backend or further functionality.');
                    alert('Successfully signed in.');

                }}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <div className="rememberSection">
                        <label htmlFor="rememberMe">Remember Me</label>
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            checked={rememberMe}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className="signInFooter">
                        <button type="submit">Sign In</button>
                        <a className="forgotPassword" onClick={togglePopup}>Forgot Password?</a>
                    </div>
                </form>
                <Popup 
                    open={isOpen}
                    onClose={togglePopup}
                    contentStyle={{width: 'auto', height: 'auto'}}
                >
                    <ResetPasswordForm />
                </Popup>
            </div>
        );
    };
    
    



    const JoinForm = () => (
        <div className="modalContent">
            <h2>Join Now</h2>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('User details submitted. Integrate with backend or further functionality.');
                console.log('Register for promotions:', registerForPromotions);
                alert('Successfully registered.');
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

