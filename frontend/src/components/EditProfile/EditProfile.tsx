import "./EditProfile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile({ userEmail }: { userEmail: string | null }) {
  const navigate = useNavigate();

  const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });

  const updateProfile = async () => {
    const profileData: any = {};

    if (passwordData.currentPassword && passwordData.newPassword && passwordData.confirmNewPassword) {
        profileData.passwordData = passwordData;
    }

    if (personalInfo.address || personalInfo.city || personalInfo.state || personalInfo.zipCode) {
        profileData.personalInfo = personalInfo;
    }

    if (cardInfo.cardNumber || cardInfo.nameOnCard || cardInfo.expirationDate || cardInfo.cvc) {
        profileData.cardInfo = cardInfo;
    }

    try {
        const response = await axios.post("http://localhost:8080/api/api/user/api/profile", profileData);
        console.log(response.data);
    } catch (error) {
        console.error("Error updating profile:", error);
    }
  };


  return (
    <>
      <div className="profile-form">
        <div className="profile-form-header">Manage Profile</div>

        <div className="profile-form-items">
          <div className="section-title">Change Password</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">Current Password</label>
              <input
                className="profile-form-input"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
            </div>

            <div className="input-group">
              <label className="profile-form-label">New Password</label>
              <input
                className="profile-form-input"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
            </div>

            <div className="input-group">
              <label className="profile-form-label">Confirm New Password</label>
              <input
                className="profile-form-input"
                type="password"
                value={passwordData.confirmNewPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmNewPassword: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form-section-button">
            <div>
             
            </div>
          </div>
        </div>

        <div className="profile-form-items">
          <div className="section-title">Change Billing Information</div>
          <div className="form-section">
            
       
            <div className="input-group">
              <label className="profile-form-label">Address</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">City</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.city}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">State</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.state}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Zip Code</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.zipCode}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-section-button">
             
            </div>
          </div>
        </div>

        <div className="profile-form-items">
          <div className="section-title">Add Card Information</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">Card Number</label>
              <input
                className="profile-form-input"
                type="text"
                value={cardInfo.cardNumber}
                onChange={(e) =>
                  setCardInfo((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Name on Card</label>
              <input
                className="profile-form-input"
                type="text"
                value={cardInfo.nameOnCard}
                onChange={(e) =>
                  setCardInfo((prev) => ({
                    ...prev,
                    nameOnCard: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Expiration Date</label>
              <input
                className="profile-form-input"
                type="month"
                value={cardInfo.expirationDate}
                onChange={(e) =>
                  setCardInfo((prev) => ({
                    ...prev,
                    expirationDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">CVC</label>
              <input
                className="profile-form-input"
                type="text"
                value={cardInfo.cvc}
                onChange={(e) =>
                  setCardInfo((prev) => ({ ...prev, cvc: e.target.value }))
                }
              />
            </div>

            <div className="form-section-button">
             <button className="save-button" onClick={updateProfile}>
            Save All Changes
          </button>
            </div>
          </div>
        </div>

        <div className="profile-footer">
          <button
            className="profile-footer-button"
            onClick={() => navigate("/")}
          >
            HOME PAGE
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
