import "./EditProfile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile({ userEmail }: { userEmail: string | null }) {

  interface Card {
    firstname: string;
    lastname: string;
    cardNumber: string;
    expDate: string;
    CVV: string;
}
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const email = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userEmail="))
    ?.split("=")[1];

  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [cardInfo, setCardInfo] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const [optOutPromo, setOptOutPromo] = useState(false);

  const handleOptOutPromo = () => {
    setOptOutPromo(!optOutPromo);
  }
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/profile?=${email}`, {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            "Referrer-Policy": 'unsafe_url'
          }
        });
        const userData = response.data;

        // Set personal information
        setPersonalInfo({
          firstName: userData.firstname || '',
          lastName: userData.lastname || '',
          address: userData.paymentAddress?.address || '',
          city: userData.paymentAddress?.city || '',
          state: userData.paymentAddress?.state || '',
          zipCode: userData.paymentAddress?.zipCode || ''
      });
      

        const card = userData.paymentCards ? (Array.from(userData.paymentCards)[0] as Card) : null;
        if (card) {
            setCardInfo({
                firstName: card.firstname,
                lastName: card.lastname,
                cardNumber: card.cardNumber,
                expDate: card.expDate,
                cvv: card.CVV
            });
        }

        // Set promotion preference
        setOptOutPromo(userData.promotionEnrolled);

      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array ensures this useEffect runs only once when the component mounts


  const updatePassword = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/profile/update-password?email=${email}`, {
        "currentPassword": passwordData.currentPassword,
        "newPassword": passwordData.newPassword
      },
        {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            "Referrer-Policy": 'unsafe_url'
          }
        });
      console.log(response.data);
      setMessage("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password. Please try again.");
    }
  };
  const updatePersonalInfo = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/profile/update-payment-address?email=${email}`, personalInfo,
        {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            "Referrer-Policy": 'unsafe_url'
          }
        });
      console.log(response.data);
      setMessage("Personal info updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
      setMessage("Error updating personal info. Please try again.");
    }
  };
  const updateCardInfo = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/profile/update-card-info', cardInfo,
        {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
            "Referrer-Policy": 'unsafe_url'
          }
        });
      console.log(response.data);
      setMessage("Card info updated successfully!");
    } catch (error) {
      console.error("Error updating card info:", error);
      setMessage("Error updating card info. Please try again.");
    }
  };
  return (
    <>
      <div className='profile-form'>
        <div className='profile-form-header'>
          Manage Profile
        </div>

        <div className='profile-form-items'>
          <div className="section-title">Change Password</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">Current Password</label>
              <input
                className="profile-form-input"
                type='password'
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              />
            </div>

            <div className="input-group">
              <label className="profile-form-label">New Password</label>
              <input
                className="profile-form-input"
                type='password'
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </div>

            <div className="input-group">
              <label className="profile-form-label">Confirm New Password</label>
              <input
                className="profile-form-input"
                type='password'
                value={passwordData.confirmNewPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
              />
            </div>

          </div>


          <div className="form-section-button">
            <div><button className='save-button' onClick={updatePassword}>Save Password</button></div>
          </div>
        </div>


        <div className='profile-form-items'>
          <div className="section-title">Change Billing Information</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">First Name</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Last Name</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Address</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">City</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.city}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">State</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.state}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Zip Code</label>
              <input
                className="profile-form-input"
                type='text'
                value={personalInfo.zipCode}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, zipCode: e.target.value }))}
              />

            </div>

            <div className="form-section-button">
              <button className='save-button' onClick={updatePersonalInfo}>Update Info</button></div>
          </div>
        </div>


        <div className='profile-form-items'>
          <div className="section-title">Change Card Information</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">First Name</label>
              <input
                className="profile-form-input"
                type='text'
                value={cardInfo.firstName}
                onChange={(e) => setCardInfo(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Last Name</label>
              <input
                className="profile-form-input"
                type='text'
                value={cardInfo.lastName}
                onChange={(e) => setCardInfo(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Card Number</label>
              <input
                className="profile-form-input"
                type='text'
                value={cardInfo.cardNumber}
                onChange={(e) => setCardInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Expiration Date</label>
              <input
                className="profile-form-input"
                type='month'
                value={cardInfo.expDate}
                onChange={(e) => setCardInfo(prev => ({ ...prev, expDate: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">CVV</label>
              <input
                className="profile-form-input"
                type='text'
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
              />
            </div>

            <div className="form-section-button">
              <button className='save-button' onClick={updateCardInfo}>SAVE</button></div>
          </div>
          <div className='profile-form-items'>
            <div className="section-title">Promo Preferences</div>
            <div className="input-group">
              <label className="profile-form-label">Opt-In Promo:</label>
              <label className="promo-label">
                <input
                  type="radio"
                  name="optOutPromo"
                  value="yes"
                  checked={optOutPromo}
                  onChange={handleOptOutPromo}
                />
                Yes
              </label>
              <label className="promo-label">
                <input
                  type="radio"
                  name="optOutPromo"
                  value="no"
                  checked={!optOutPromo}
                  onChange={handleOptOutPromo}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="message-container">
          {message}
        </div>

        <div className='profile-footer'>

          <button className='profile-footer-button' onClick={() => navigate("/")}>Home Page</button>
        </div>
      </div>
    </>
  );
}


export default EditProfile;