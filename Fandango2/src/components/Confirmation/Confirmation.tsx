import React from 'react';
import './Confirmation.css';

const Confirmation: React.FC = () => {
    const Cancellation = () => {
      

    }

    return(
        <div className='confirmation-container'>
            <h1>Booking Confirmation</h1>
        <table>
            <tr>
                <td>Movie Name:</td>
                <td></td>
            </tr>
            <tr>
                <td>Date:</td>
                <td></td>
            </tr>
            <tr>
                <td>Seats:</td>
                <td></td>
            </tr>
            <tr>
                <td>Confirmation Number:</td>
                <td></td>
            </tr>
        </table>
      
            <h3>Ticket info</h3>
            <h3>Theatre info</h3>
            <a href="https://www.example.com">Cancel Reservation</a>
        </div>
    );
};


export default Confirmation;