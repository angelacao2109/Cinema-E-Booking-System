import { useState } from 'react';
import './Summary.css';

import React from 'react';



const Summary: React.FC = () => {
    const handleProceed = () => {
        alert('Proceed button clicked!');
          };
  return (
    <div>
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
          <td>Total:</td>
          <td></td>
        </tr>
      </tbody>
    </table>
            <button onClick={handleProceed}>Proceed to Checkout</button>
    </div>
  );
};


export default Summary;
