import React, { useState } from 'react';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ticketPrices = {
  kids: 5,
  adult: 10,
  senior: 7
};

const Checkout: React.FC = () => {
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
    // Add your logic to handle form submission (e.g., sending data to a server)
    console.log('Form submitted:', userData);
    navigate("/confirmation");
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h1>Checkout</h1>
      <div className="summary">
        <h3>Order Total: ${total}</h3>
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
        <div className="payment-info">
          <h2>Payment Information</h2>
          <InputField label="Promo Code:" name="PromoCode" value={userData.PromoCode} onChange={handleChange} />
          <InputField label="Credit Card Number:" name="CreditCardNumber" value={userData.CreditCardNumber} onChange={handleChange} />
          <InputField label="Expiry Date:" name="ExpiryDate" value={userData.ExpiryDate} onChange={handleChange} />
          <InputField label="CVV:" name="CVV" value={userData.CVV} onChange={handleChange} />
        </div>
      </div>
      <button type="submit">Submit</button>
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
