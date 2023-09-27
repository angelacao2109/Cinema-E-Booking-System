import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Registration () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        cardNumber: '',
        nameOnCard: '',
        expirationDate: '',
        cvc: '',
        subscribeOffers: false,
        agreeTerms: false,
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('/api/register', formData);
            if (response.status === 200) {
                alert("Registration Successful");
                navigate("/"); // or wherever you'd like to navigate the user post-registration
            }
        } catch (error) {
                console.error('Error registering:', error);
                alert("Error during registration. Please try again.");
            }
        }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

   
   return(
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="header">Registration for Club Access!</div>
        <div className="form-body">
            <div className='header2'>Registration Information</div>

            <div className="firstName">
                <label className="form-label">First Name * </label>
                <input
                    className="form-input"
                    type="text"
                    placeholder='First Name'
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
              />
              </div>
                 <div className="lastName">
                <label className="form-label">Last Name * </label>
                <input
                    className="form-input"
                    type="text"
                    placeholder='Last Name'
                    name="lastName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                </div>
                 <div className="email">
                <label className="form-label">Email * </label>
                <input
                    className="form-input"
                    type="email"
                    placeholder='Email'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </div>
            <div className="Password">
                <label className="form-label">Password * </label>
                <input
                    className="form-input"
                    type="password"
                    placeholder='Password'
                    name="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
           </div>
           <div className="confirmPassword">
    <label className="form-label">Confirm Password * </label>
    <input
        className="form-input"
        type="password"
        placeholder='Confirm Password'
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
    />
</div>
            
            <hr className='hr'/>
            <div className='header2'>
                Personal Information
            </div>

            <div className="Address">
    <label className="form-label">Address </label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='Address' 
        name="address" 
        value={formData.address} 
        onChange={handleChange}
    />
    </div>
    <div className="City">
    <label className="form-label">City </label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='City' 
        name="city" 
        value={formData.city} 
        onChange={handleChange}
    />
</div>
<div className="State">
    <label className="form-label">State</label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='State' 
        name="state" 
        value={formData.state} 
        onChange={handleChange}
    />
</div>
<div className="ZipCode">
    <label className="form-label">Zip Code</label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='Zip Code' 
        name="zipCode" 
        value={formData.zipCode} 
        onChange={handleChange}
    />
</div>
<div className="Phone">
    <label className="form-label">Phone Number </label>
    <input 
        className="form-input" 
        type="tel" 
        placeholder='Phone Number' 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange}
    />
</div>
            <hr className='hr'/>

            <div className='header2'>
                Card Information
            </div>

    
            <div className="number">
    <label className="form-label">Card Number </label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='Number' 
        name="cardNumber" 
        value={formData.cardNumber} 
        onChange={handleChange}
    />
</div>
<div className="name">
    <label className="form-label">Name on Card </label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='Name' 
        name="nameOnCard" 
        value={formData.nameOnCard} 
        onChange={handleChange}
    />
</div>
<div className="expirationDate">
    <label className="form-label">Expiration Date </label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='Valid Thru' 
        name="expirationDate" 
        value={formData.expirationDate} 
        onChange={handleChange}
    />
</div>
<div className="cvc">
    <label className="form-label">CVC</label>
    <input 
        className="form-input" 
        type="text" 
        placeholder='CVC' 
        name="cvc" 
        value={formData.cvc} 
        onChange={handleChange}
    />
</div>
            <div>

                <br/>
              
                <input 
        className="checkbox" 
        type="checkbox" 
        name="subscribeOffers" 
        checked={formData.subscribeOffers} 
        onChange={handleCheckboxChange}
    />
                <label className="checkbox-label">Subscribe for exclusive offers and the latest movie news</label>
                <br/>
             
             
                <input 
        className="checkbox" 
        type="checkbox" 
        name="agreeTerms" 
        checked={formData.agreeTerms} 
        onChange={handleCheckboxChange}
    />
                 <label className="checkbox-label">I agree to the <a href="#TERMS">Terms and Conditions</a></label>
            </div>
           
        
            <div className="footer">
                <br/>
                <button className="button" type="submit">Register</button>
                <div className="signIn">Already have an account? <a href='#SIGNIN'>Sign In</a></div>
                <div>
                     <button type="button" onClick={() => navigate("/")}>Return</button>
                </div>
            </div>
       </div>
       </div>
          
      </form> 
    );      
                    }

export default Registration;