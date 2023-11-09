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

  const [cards, setCards] = useState<Card[]>([
    { firstname: "", lastname: "", cardNumber: "", expDate: "", CVV: "" },
  ]);

  const [isCardSaved, setIsCardSaved] = useState<boolean[]>([]);

  const addCard = () => {
    setCards([
      ...cards,
      { firstname: "", lastname: "", cardNumber: "", expDate: "", CVV: "" },
    ]);
    setIsCardSaved([...isCardSaved, false]);
  };

  const deleteCard = (index: number) => {
    // Assuming you want to call the API to delete the card
    const cardToDelete = cards[index];
    removeCardInfo(cardToDelete); // Make sure this function is properly implemented to call your API

    // Then update the state to remove the card from the UI
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);

    const newIsCardSaved = [...isCardSaved];
    newIsCardSaved.splice(index, 1);
    setIsCardSaved(newIsCardSaved);
  };


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
    phoneNumber: "",
  });

  const [cardInfo, setCardInfo] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [optOutPromo, setOptOutPromo] = useState(false);

  const handleOptOutPromo = () => {
    setOptOutPromo(!optOutPromo);
  };
  const [message, setMessage] = useState("");



  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/profile?email=${email}`,
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json",
              "Referrer-Policy": "unsafe_url",
            },
          }
        );
        const userData = response.data;

        // Set personal information
        setPersonalInfo({
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          address: userData.paymentAddress?.address || "",
          city: userData.paymentAddress?.city || "",
          state: userData.paymentAddress?.state || "",
          zipCode: userData.paymentAddress?.zipCode || "",
          phoneNumber: userData?.phonenumber || "",

        });

        // Set the cards from the response, only showing the first 4 digits of the card number
        const fetchedCards = userData.paymentCards.map(card => ({
          firstname: card.firstname,
          lastname: card.lastname,
          cardNumber: card.cardNumber.slice(0, 4), // only first 4 digits for display
          expDate: card.expDate,
          CVV: '' // For security reasons, we do not display CVV
        }));
        setCards(fetchedCards);

        // Initialize isCardSaved for the fetched cards
        setIsCardSaved(fetchedCards.map(() => true));



      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [email, authToken]); // Add email and authToken as dependencies if they are expected to change over time


  const updatePassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/profile/update-password?email=${email}`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
            "Referrer-Policy": "unsafe_url",
          },
        }
      );
      console.log(response.data);
      setMessage("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password. Please try again.");
    }
  };
  const updatePersonalInfo = async () => {

    try {
      const response = await axios.post(`http://localhost:8080/api/user/profile/update?email=${email}`, {
        firstname: personalInfo.firstName,
        lastname: personalInfo.lastName,
        phoneNumber: personalInfo.phoneNumber,
        paymentAddress: {
          address: personalInfo.address,
          city: personalInfo.city,
          state: personalInfo.state,
          zipCode: personalInfo.zipCode,
        }
      }, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
          "Referrer-Policy": "unsafe_url",
        },
      }
      );
      console.log(response.data);
      setMessage("Personal info updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
      setMessage("Error updating personal info. Please try again.");
    }
  };

  async function updateCardInfo() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/profile/update-card-info",
        { cards },
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
            "Referrer-Policy": "unsafe_url",
          },
        }
      );
      console.log(response.data);
      setMessage("Card info updated successfully!");
    } catch (error) {
      console.error("Error updating card info:", error);
      setMessage("Error updating card info. Please try again.");
    }
  }

  const saveCardInfo = async (index: number) => {
    const cardData = index >= 0 ? cards[index] : cardInfo;
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    try {
      const card = cards[index];
      const response = await axios.post(
        "http://localhost:8080/api/user/profile/card/add",
        {
          cvv: card.CVV,
          firstName: card.firstname,
          lastName: card.lastname,
          cardNumber: card.cardNumber,
          expDate: card.expDate
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        const newIsCardSaved = [...isCardSaved];
        newIsCardSaved[index] = true;
        setIsCardSaved(newIsCardSaved);
      } else {
        // Handle any other response
      }
    } catch (error) {
      console.error("Error saving card info:", error);
      // Handle error, e.g., by showing a message to the user
    }
  };

  const removeCardInfo = async (card: Card) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/user/profile/card/delete",
        {
          data: card,
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
            "Referrer-Policy": "unsafe_url",
          },
        }
      );

      if (response.status === 200) {
        // Handle successful card deletion
        setMessage("Card deleted successfully!");
        // You may want to update the state to remove the card from the UI here
      } else {
        // Handle any other response
        setMessage("Failed to delete the card.");
      }
    } catch (error) {
      console.error("Error deleting card info:", error);
      // Handle error, e.g., by showing a message to the user
      setMessage("Error deleting card info. Please try again.");
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
              <button className="save-button" onClick={updatePassword}>
                Save Password
              </button>
            </div>
          </div>
        </div>

        <div className="profile-form-items">
          <div className="section-title">Change Billing Information</div>
          <div className="form-section">
            <div className="input-group">
              <label className="profile-form-label">First Name</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group">
              <label className="profile-form-label">Last Name</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
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
            <div className="input-group">
              <label className="profile-form-label">Phone Number</label>
              <input
                className="profile-form-input"
                type="text"
                value={personalInfo.phoneNumber}
                onChange={(e) => setPersonalInfo((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))}
              />
            </div>

            <div className="form-section-button">
              <button className="save-button" onClick={updatePersonalInfo}>
                Update Info
              </button>
            </div>
          </div>
        </div>

        <div className="profile-form-items">
          <div className="section-title">Change Card Information</div>
          {
            // Display existing cards
            cards.map((card, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  position: "relative",
                  marginBottom: "10px",
                }}
              >
                {/* Card Name */}
                <div className="input-group">
                  <label className="profile-form-label">Name on card:</label>
                  <span className="profile-form-text">{card.firstname} {card.lastname}</span>
                </div>

                {/* Card Number */}
                <div className="input-group">
                  <label className="profile-form-label">Card Number:</label>
                  <span className="profile-form-text">{card.cardNumber} **** **** ****</span>
                </div>

                {/* Delete Card Button */}
                {isCardSaved[index] && (
                  <button
                    className="card-action-button"
                    onClick={() => deleteCard(index)}
                  >
                    Delete Card
                  </button>
                )}
              </div>
            ))
          }

          {
            // Add Card Section
            cards.length < 3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                  border: "1px solid #ccc",
                  padding: "10px"
                }}
              >
                <div className="input-group">
                  <label className="profile-form-label">First Name</label>
                  <input
                    className="profile-form-input"
                    type="text"
                    value={cardInfo.firstName}
                    onChange={(e) => setCardInfo({ ...cardInfo, firstName: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label className="profile-form-label">Last Name</label>
                  <input
                    className="profile-form-input"
                    type="text"
                    value={cardInfo.lastName}
                    onChange={(e) => setCardInfo({ ...cardInfo, lastName: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label className="profile-form-label">Card Number</label>
                  <input
                    className="profile-form-input"
                    type="text"
                    value={cardInfo.cardNumber}
                    onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label className="profile-form-label">Expiration Date</label>
                  <input
                    className="profile-form-input"
                    type="month"
                    value={cardInfo.expDate}
                    onChange={(e) => setCardInfo({ ...cardInfo, expDate: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label className="profile-form-label">CVV</label>
                  <input
                    className="profile-form-input"
                    type="text"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  />
                </div>
                <button onClick={() => saveCardInfo(-1)}>Save New Card</button>
              </div>
            )
          }

        </div>

        <div className="profile-form-items">
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

        <div className="message-container">{message}</div>

        <div className="profile-footer">
          <button
            className="profile-footer-button"
            onClick={() => navigate("/")}
          >
            Home Page
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
