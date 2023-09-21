import React, { useState } from 'react';
import axios from 'axios';
import './ResetPasswordForm.css'

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/request-password-reset', { email })
            .then(response => {
                const { data } = response;
                if (data.success) {
                    console.log('Reset link sent successfully.');
                    alert('Reset link sent to your email.'); // User feedback
                } else {
                    console.log('Error sending reset link.', data.message);
                    alert('Error sending reset link. Please try again.'); // User feedback
                }
            })
            .catch(error => {
                console.error('Error sending reset link:', error);
                alert('Error sending reset link. Please check your connection and try again.'); // User feedback
            });
    };
    

    return (
        <div className="centerContainer">
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
        </div>
    );
};

export default ResetPasswordForm;
