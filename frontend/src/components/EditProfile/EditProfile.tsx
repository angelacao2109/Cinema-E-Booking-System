import "./EditProfile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile({ userEmail }: { userEmail: string | null }) {
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
      const updatePassword = async () => {
          try {
            const response = await axios.post(`http://localhost:8080/api/user/profile/update-password?email=${email}`,  {
                    "currentPassword":passwordData.currentPassword,
                    "newPassword":passwordData.newPassword},
                  {headers: {
                    'Authorization': authToken,
                    'Content-Type':'application/json',		
                    "Referrer-Policy":'unsafe_url'
                  }});
              console.log(response.data);
          } catch (error) {
              console.error("Error updating password:", error);
          }
      };
      const updatePersonalInfo = async () => {
          try {
              const response = await axios.post(`http://localhost:8080/api/user/profile/update-payment-address?email=${email}`, personalInfo,
              {headers: {
                'Authorization': authToken,
                'Content-Type':'application/json',		
                "Referrer-Policy":'unsafe_url'
              }});
              console.log(response.data);
          } catch (error) {
              console.error("Error updating personal info:", error);
          }
      };
      const updateCardInfo = async () => {
          try {
              const response = await axios.post('http://localhost:8080/api/user/profile/update-card-info', cardInfo,
              {headers: {
                'Authorization': authToken,
                'Content-Type':'application/json',		
                "Referrer-Policy":'unsafe_url'
              }});
              console.log(response.data);
          } catch (error) {
              console.error("Error updating card info:", error);
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
                  </div>
  
                  <div className='profile-footer'>
                  <button 
                        className='profile-footer-button' 
                        onClick={handleOptOutPromo}
                    >
                        {optOutPromo ? "Opt-In Promo" : "Opt-Out Promo"}
                    </button>
                      <button className='profile-footer-button' onClick={() => navigate("/")}>Home Page</button>
                   </div>
            </div>
        </>
    );
}

  
  export default EditProfile;