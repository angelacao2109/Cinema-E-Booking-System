import { useState } from 'react';
import './Summary.css';

import React from 'react';



const Summary: React.FC = () => {
    const handleProceed = () => {
        alert('Proceed button clicked!');
          };
  return (
    <div className='summary-container'>
        <h1>Summary</h1>
        <h2>MovieName</h2>
        <h3>Date and Time</h3>
    <table>
      <tbody>
        <tr>
          <td>Tickets:</td>
          <td></td>
        </tr>
        <tr>
          <td>Seats:</td>
          <td></td>
        </tr>
        <tr>
          <td>Fee:</td>
          <td></td>
        </tr>
        <tr>
          <td>Taxes:</td>
          <td></td>
        </tr>
        <tr>
          <th>Total:</th>
          <th></th>
        </tr>
      </tbody>
    </table>
            <button onClick={handleProceed}>Proceed to Checkout</button>
    </div>
  );
};


export default Summary;