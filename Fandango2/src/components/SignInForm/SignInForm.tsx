import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.css';
import { Link } from 'react-router-dom';

type SignInFormProps = {};

const SignInForm: React.FC<SignInFormProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }

    return (
        <div className="signInContent">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
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
                    <Link to="/forgot-password" className="forgotPassword">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
