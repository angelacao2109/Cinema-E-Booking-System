import React from 'react';
import './Confirmation.css';

// TODO AUTH

const Confirmation: React.FC = () => {
    const Cancellation = () => {
      // Intentionally left blank
    }

    return (
        <div className='confirmation-container'>
            <header>
                <h1>Booking Confirmation</h1>
            </header>

            <section className='booking-details'>
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
            </section>

            <section className='ticket-info'>
                <table>
                    <tr>
                        <td>Ticket Type:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Discount:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td></td>
                    </tr>
                </table>
            </section>

            <section className='theatre-info'>
                <h3>Theatre info</h3>
                {/* Additional information about the theatre can be added here */}
            </section>

            <footer>
                
                <a href="/checkout" className="cancellation-link">Cancel</a>
                <button className="confirm-btn">Confirm</button>
            </footer>
        </div>
    );
};

export default Confirmation;
