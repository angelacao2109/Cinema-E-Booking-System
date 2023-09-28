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

    if (name === 'CreditCardNumber') {
      const formattedValue = value.replace(/\D/g, '');
      const formattedNumber = formattedValue.replace(/(\d{4})/g, '$1 ').trim();

      setUserData({
        ...userData,
        [name]: formattedNumber
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log('Form submitted:', userData);
  };

  const handleSaveInfo = () => {
    // Add logic to save user info
    console.log('User info saved:', userData);
  };

  const handleSaveInfo2 = () => {
    // Add logic to save payment info
    console.log('User info saved:', userData);
  };

  return (
    <form onSubmit={handleCheckout}>
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
            <tr>
                <td></td>
                <td><button type="button" onClick={handleSaveInfo} className="save-info-button">Save Info</button></td>
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
                <td><input type="text" name="CreditCardNumber" value={userData.CreditCardNumber} onChange={handleChange} maxLength={19} placeholder='xxxx xxxx xxxx xxxx'/></td>
            </tr>
            <tr>
                <td>Expiry Date:</td>
                <td><input type="text" name="ExpiryDate" value={userData.ExpiryDate} onChange={handleChange} maxLength={5} placeholder='MM/YY'/></td>
            </tr>
            <tr>
                <td>CVV:</td>
                <td><input type="text" name="CVV" value={userData.CVV} onChange={handleChange} maxLength={3} placeholder='CVV'/></td>
            </tr>
            <tr>
                <td></td>
                <td><button type="button" onClick={handleSaveInfo2} className="save-info-button">Save Info</button></td>
            </tr>
        </table>
        
        <button type="submit" className='checkout-button'>Checkout</button>     
      </div>
    </form>
    
  );
};

export default Checkout;