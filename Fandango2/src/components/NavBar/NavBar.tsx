import React, { useState, useEffect } from 'react';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'; 


type NavBarProps = {
    movieData: any[];
};

function NavBar({ movieData }: NavBarProps) {
    const [rememberMe, setRememberMe] = useState(false);
    const [registerForPromotions, setRegisterForPromotions] = useState(false); 
    const [moviesPlaying, setMoviesPlaying] = useState<any[]>([]);
    const [moviesComingSoon, setMoviesComingSoon] = useState<any[]>([]);
    useEffect(() => {
        // Fetching movies playing now
        axios.get('/api/movies-playing')
            .then(response => {
                setMoviesPlaying(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies playing:', error);
            });

        // Fetching movies coming soon
        axios.get('/api/movies-coming-soon')
            .then(response => {
                setMoviesComingSoon(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies coming soon:', error);
            });

    }, []); // Empty dependency array means this useEffect runs once when component mounts



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
            axios.post('/api/request-password-reset', { email })
            .then(response => {
                const { data } = response;
                if (data.success) {
                    console.log('Reset link sent successfully.');
                } else {
                    console.log('Error sending reset link.', data.message);
                }
            })
            .catch(error => {
                console.error('Error sending reset link:', error);
            });
    };
    
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
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            axios.post('/api/signin', { email, password, remember: rememberMe })
            .then(response => {
                const { data } = response;
                if (data.success) {
                    console.log('Successfully signed in.');
                    alert('Successfully signed in.');
                } else {
                    console.log('Error signing in.', data.message);
                    alert('Error signing in.');
                }
            })
            .catch(error => {
                console.error('Error signing in:', error);
            });
    };
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
    
    


    const JoinForm = () => {
        const [email, setEmail] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [birthDate, setBirthDate] = useState('');
        const [password, setPassword] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            email,
            firstName,
            lastName,
            birthDate,
            password,
            phoneNumber,
            registerForPromotions
        };

        axios.post('/api/register', user)
            .then(response => {
                const { data } = response;
                if (data.success) {
                    console.log('Successfully registered.');
                    alert('Successfully registered.');
                } else {
                    console.log('Error during registration.', data.message);
                    alert('Error during registration.');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    };
    return (
        <div className="modalContent">
            <h2>Join Now</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="First Name" 
                  required 
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
              />
              <input 
                  type="text" 
                  placeholder="Last Name" 
                  required 
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
              />
              <input 
                  type="date" 
                  placeholder="Birthday" 
                  required 
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
            />
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
    }

    return (
        <nav className="navbar">
            <div className="leftLinks">
                <a href="/" className="link">Home</a>
                <SearchBar placeholder="Search..." />
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

