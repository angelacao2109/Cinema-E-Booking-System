import React, { useState } from 'react';
import './Checkout.css';



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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className = "container">
        <label> First Name: <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} /></label>
      
        <label> Last Name: <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} /></label>

        <label> Address: <input type="text" name="address" value={userData.Address} onChange={handleChange} /></label>

        <label> Email: <input type="text" name="email" value={userData.Email} onChange={handleChange} /></label>
        
        </div>

        <div className = "container2">
      
        <label> Promo Code: <input type="text" name="PromoCode" value={userData.PromoCode} onChange={handleChange} /></label>

        <label> Credit Card Number: <input type="text" name="CreditCardNumber" value={userData.CreditCardNumber} onChange={handleChange} /></label>

        <label> Expiry Date: <input type="text" name="expiryDate" value={userData.ExpiryDate} onChange={handleChange} /></label>
        
        <label> CVV: <input type="text" name="CVV" value={userData.CVV} onChange={handleChange} /></label>

        </div>
        <button type="submit">Submit</button>
    </form>
    
  );
};

export default Checkout;