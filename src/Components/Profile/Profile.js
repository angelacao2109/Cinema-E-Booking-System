import './Profile.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function Profile () {
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState(false);
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [visible3, setVisible3] = React.useState(false);
    return(
        <>
            <div className='profile-form'>
                <div className='profile-form-header'>
                    Manage Profile
                </div>
                <br/>
                <div className='profile-form-items'>
                    <button className='button' onClick={() => setVisible(!visible)}>{visible ? 'Change Email':'Change Email'}</button>
                    <div className='hidden' style={{display: visible ? 'block' : 'none'}}>
                        <div>
                            <label className="profile-form-label">Current Email</label>
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">New Email</label>
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Confirm Email</label>
                            <input className="profile-form-input" type='text'/>
                        </div>
                        <div><button className='save-button'>SAVE</button></div>
                    </div>
                </div>
                <br/>
                <div className='profile-form-items'>
                    <button className='button' onClick={() => setVisible1(!visible1)}>{visible1 ? 'Change Password':'Change Password'}</button>
                    <div className='hidden' style={{display: visible1 ? 'block' : 'none'}}>
                        <div>
                            <label className="profile-form-label">Current Password</label>
                            <input className="profile-form-input" type='password'/>
                            <label className="profile-form-label">New Password</label>
                            <input className="profile-form-input" type='password'/>
                            <label className="profile-form-label">Confirm New Password</label>
                            <input className="profile-form-input" type='password'/>
                        </div>
                        <div><button className='save-button'>SAVE</button></div>
                    </div>
                </div>

                <br/>
                <div className='profile-form-items'>
                    <button className='button' onClick={() => setVisible2(!visible2)}>{visible2 ? 'Change Personal Information':'Change Personal Information'}</button>
                    <div className='hidden' style={{display: visible2 ? 'block' : 'none'}}>
                        <div>
                            <label className="profile-form-label">First Name</label>
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Last Name</label> 
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Address</label>
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">City</label> 
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">State</label>
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Zip Code</label> 
                            <input className="profile-form-input" type='text'/>
                        </div>
                        <div><button className='save-button'>SAVE</button></div>
                    </div>
                </div>

                <br/>
                <div className='profile-form-items'>
                    <button className='button' onClick={() => setVisible3(!visible3)}>{visible3 ? 'Change Card Information':'Change Card Information'}</button>
                    <div className='hidden' style={{display: visible3 ? 'block' : 'none'}}>
                        <div>
                            <label className="profile-form-label">Card Number</label> 
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Name on Card</label> 
                            <input className="profile-form-input" type='text'/>
                            <label className="profile-form-label">Expiration Date</label> 
                            <input className="profile-form-input" type='mo'/>
                            <label className="profile-form-label">CVC</label> 
                            <input className="profile-form-input" type='text'/>
                        </div>
                        <div><button className='save-button'>SAVE</button></div>
                    </div>
                </div>
                <div className='profile-footer'>
                <button className='profile-footer-button'
                    onClick={() => {
                    navigate("/");}}>HOME PAGE
                </button>
            </div>
            </div>
        </>
    );
}

export default Profile;