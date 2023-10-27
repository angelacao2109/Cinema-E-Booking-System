import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function VerifyEmail(props) {
    const navigate = useNavigate();
    const [verified, setVerified] = useState<null | boolean>(null);
    const location = useLocation();

    useEffect(() => {
        // Extract the token from the URL
        const token = new URLSearchParams(location.search).get("token");
    
        // Send a request to the backend to verify the token
        axios.get('http://localhost:8080/api/auth/verify?code='+token)
            .then(response => {
                console.log("Successful response:", response);  // <-- Printing the successful response
                if (response.status === 200) {
                    setVerified(true);
                    navigate('/signin');  
                }
            })
            .catch(error => {
                console.error("Error response:", error);  // <-- Printing the error response
                setVerified(false);
            });
    }, []);  // <-- Removed dependency from here
    return (
        <div>
            {verified === null && <p>Verifying your email...</p>}
            {verified === true && <p>Email verified successfully!</p>}
            {verified === false && <p>Failed to verify email. Please try again or contact support.</p>}
        </div>
    );
}

export default VerifyEmail;
