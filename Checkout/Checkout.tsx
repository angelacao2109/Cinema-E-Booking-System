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
      <h1>Checkout</h1>
	    <h3>Order Total : </h3>
        <table>
            <tr>
                <td>First Name:</td>
                <td><input type="text" name="firstName" value={userData.firstName} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Last Name:</td>
                <td><input type="text" name="lastName" value={userData.lastName} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Address:</td>
                <td><input type="text" name="address" value={userData.Address} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><input type="text" name="email" value={userData.Email} onChange={handleChange} /></td>
            </tr>
        </table>
      </div>

      <div className = "container2">
        <table>
            <tr>
                <td>Promo Code:</td>
                <td><input type="text" name="PromoCode" value={userData.PromoCode} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Credit Card Number:</td>
                <td><input type="text" name="CreditCardNumber" value={userData.CreditCardNumber} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>Expiry Date:</td>
                <td><input type="text" name="ExpiryDate" value={userData.ExpiryDate} onChange={handleChange} /></td>
            </tr>
            <tr>
                <td>CVV:</td>
                <td><input type="text" name="CVV" value={userData.CVV} onChange={handleChange} /></td>
            </tr>
        </table>      
      </div>
      <button type="submit">Submit</button>
    </form>
    
  );
};

export default Checkout;