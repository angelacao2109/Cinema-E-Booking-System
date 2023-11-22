import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ticketPrices = {
  kids: 5,
  adult: 10,
  senior: 7
};

interface Card {
  cardID: number;
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

const Checkout: React.FC = () => {

  const [userCards, setUserCards] = useState<Card[]>([]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [addNewCard, setAddNewCard] = useState(false);
  

  const fetchUserCards = async () => {
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
      setUserCards(response.data.paymentCards);
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    Email: '',
    Address: '',
    PromoCode:'',
    CreditCardNumber: '',
    ExpiryDate: '',
    CVV: ''
  });

  const location = useLocation();
  const { selectedSeats, ticketCounts } = location.state || { selectedSeats: [], ticketCounts: { kids: 0, adult: 0, senior: 0 } };
  
  // Calculate the total based on ticket counts and their prices
  let total = 0;
  for (let ticketType in ticketCounts) {
    total += ticketCounts[ticketType] * ticketPrices[ticketType];
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', userData);
    navigate("/confirmation");
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h1>Checkout</h1>
      <div className="summary">
        <h4>Order Total: ${total}</h4>
        <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
      </div>
      <div className="container">
        <div className="personal-info">
          <h2>Personal Information</h2>
          <InputField label="First Name:" name="firstName" value={userData.firstName} onChange={handleChange} />
          <InputField label="Last Name:" name="lastName" value={userData.lastName} onChange={handleChange} />
          <InputField label="Address:" name="address" value={userData.Address} onChange={handleChange} />
          <InputField label="Email:" name="email" value={userData.Email} onChange={handleChange} />
        </div>
        <div className="payment-method-selection">
  <h2>Select Payment Method</h2>
  {userCards.length > 0 && (
    userCards.map((card, index) => (
      <div key={index}>
        <input 
          type="radio" 
          id={`card-${index}`} 
          name="selectedCard" 
          value={card.cardID}
          onChange={() => setAddNewCard(false)}
        />
        <label htmlFor={`card-${index}`}>
          {`**** **** **** ${card.cardNumber.slice(-4)} (Expires: ${card.expDate})`}
        </label>
      </div>
    ))
  )}

  <div>
    <input 
      type="radio" 
      id="new-card-option" 
      name="selectedCard" 
      value="newCard"
      onChange={() => setAddNewCard(true)}
    />
    <label htmlFor="new-card-option">Use a different card</label>
  </div>
</div>
</div>
{addNewCard && (
  <div className="new-card-info">
    <InputField label="Card Number:" name="cardNumber" value={newCard.cardNumber} onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})} />
    <InputField label="Expiry Date:" name="expDate" value={newCard.expDate} onChange={(e) => setNewCard({...newCard, expDate: e.target.value})} />
    <InputField label="CVV:" name="cvv" value={newCard.cvv} onChange={(e) => setNewCard({...newCard, cvv: e.target.value})} />
  </div>
)}


      <div className="button-container">
  <button type="submit">Submit</button>
</div>
    </form>
  );
};

const InputField = ({ label, name, value, onChange }: any) => (
  <div className="input-field">
    <label>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} />
  </div>
);

export default Checkout;
