import React, { useState } from 'react';
import axios from 'axios';
import './ResetPasswordForm.css';

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/request-password-reset', { email });
            if (response.data.success) {
                setFeedbackMessage('Reset link sent to your email.');
            } else {
                setFeedbackMessage('Error sending reset link. Please try again.');
            }
        } catch (error) {
            setFeedbackMessage('Error sending reset link. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="centerContainer">
            <div className="modalContent">
                <h2>Reset Password</h2>
                {feedbackMessage && <p>{feedbackMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-label="Email address"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Request Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
