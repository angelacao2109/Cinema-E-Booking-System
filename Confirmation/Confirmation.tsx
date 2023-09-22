import React from 'react';
import './Confirmation.css';

const Confirmation: React.FC = () => {
    const Cancellation = () => {
        //Cancellation 

    }

    return(
        <div>
            <h1>Booking Confirmation</h1>
            <h2>Confirmation Number</h2>
            <h1>Movie Name</h1>
            <h2>Date</h2>
            <h3>Ticket info</h3>
            <h3>Theatre info</h3>
            <button onClick={Cancellation}> Cancel Reservation</button>
        </div>
    );
};


export default Confirmation;