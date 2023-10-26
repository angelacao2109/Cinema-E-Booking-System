import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationConfirmation.css";

function RegistrationConfirmation() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  
    async function confirmRegistration() {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/register"); 
        if (response.status !== 200) {
          setError("Failed to confirm registration. Please try again later.");
        }
      } catch (err) {
        setError("Error confirming registration. Please check your connection and try again.");
      }
    }

    confirmRegistration();
  }, []);

  return (
    <div className="confirmationContainer">
      {error ? (
        <div>
          <h2>Registration Confirmation Failed</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/register")}>Return to Registration</button>
        </div>
      ) : (
        <div>
          <h2>Registration Successful!</h2>
          <p>Thank you for registering. You can now access all the benefits of Club Access!</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      )}
    </div>
  );
}

export default RegistrationConfirmation;
