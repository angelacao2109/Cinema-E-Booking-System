import React from 'react';
import './Registration.css';
import { useNavigate } from "react-router-dom";

function Registration () {
    const navigate = useNavigate();
   return(
      <div className="form">
        <div className="header">Registration for Club Access!</div>
        <div className="form-body">
            <div className='header2'>Registration Information</div>
            <div className="firstName">
                <label className="form-label">First Name </label>
                <input className="form-input" type="text" placeholder='First Name'></input>
            </div>
            <div className="lastName">
                <label className="form-label">Last Name </label>
                <input className="form-input" type="text" placeholder='Last Name'></input>
            </div>
            <div className="email">
                <label className="form-label">Email </label>
                <input className="form-input" type="text" placeholder='Email'></input>
            </div>
            <div className="Password">
                <label className="form-label">Password </label>
                <input className="form-input" type="password" placeholder='Password'></input>
            </div>
            <div className="confirmPassword">
                <label className="form-label">Confirm Password </label>
                <input className="form-input" type="password" placeholder='Confirm Password'></input>
            </div>
          

            <hr className='hr'/>
            <div className='header2'>
                Personal Information
            </div>
            <div className="Address">
                <label className="form-label">Address </label>
                <input className="form-input" type="text" placeholder='Address'></input>
            </div>
            <div className="City">
                <label className="form-label">City </label>
                <input className="form-input" type="text" placeholder='City'></input>
            </div>
            <div className="State">
                <label className="form-label">State</label>
                <input className="form-input" type="state" placeholder='State'></input>
            </div>
            <div className="ZipCode">
                <label className="form-label">Zip Code</label>
                <input className="form-input" type="state" placeholder='Zip Code'></input>
            </div>
            <div className="Phone">
                <label className="form-label">Phone Number </label>
                <input className="form-input" type="text" placeholder='Phone Number'></input>
            </div>

            <hr className='hr'/>

            <div className='header2'>
                Card Information
            </div>

            <div>

            </div>
                <div className="number">
                    <label className="form-label">Card Number </label>
                    <input className="form-input" type="text" placeholder='Number'></input>
                </div>
                <div className="name">
                    <label className="form-label">Name on Card </label>
                    <input className="form-input" type="text" placeholder='Name'></input>
                </div>
                <div className="expirationDate">
                    <label className="form-label">Expiration Date </label>
                    <input className="form-input" type="text" placeholder='Valid Thru'></input>
                </div>
                <div className="cvc">
                    <label className="form-label">CVC</label>
                    <input className="form-input" type="text" placeholder='CVC'></input>
                </div>
            <div>

                <br/>
                <input className="checkbox" type="checkbox"></input>
                <label className="checkbox-label">Subscribe for exclusive offers and the latest movie news</label>
                <br/>
                <input className="checkbox" type="checkbox"></input>
                <label className="checkbox-label">I agree to the <a href="#TERMS">Terms and Conditions</a></label>
            </div>
            <div className="footer">
                <br/>
                <button className="button" type="submit">Register</button>
                <div className="signIn">Already have an account? <a href='#SIGNIN'>Sign In</a></div>
                <div>
                    <button
                        onClick={() => {
                        navigate("/");
                        }}>
                        Return
                    </button>
                </div>
            </div>
        </div>
      </div>      
    )       
}

export default Registration;
