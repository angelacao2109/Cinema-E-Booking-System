import React from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmation.css';

const Confirmation: React.FC = () => {
    const location = useLocation();
    const { bookingData } = location.state as { bookingData: any };

    const getRowLetter = (rowNumber: number) => {
        return String.fromCharCode(65 + rowNumber - 1); // ASCII code for 'A' is 65
    };

    return (
        <div className='confirmation-container'>
            <header>
                <h1>Booking Confirmation</h1>
            </header>

            <section className='booking-details'>
                <table>
                    <tr>
                        <td>Date:</td>
                        <td>{bookingData.timestamp}</td>
                    </tr>
                    <tr>
                        <td>Seats:</td>
                        <td>
                            {bookingData.tickets.map((ticket: any) => 
                                `${getRowLetter(ticket.seatCol)}${ticket.seatRow}`
                            ).join(', ')}
                        </td>
                    </tr>
                    <tr>
                        <td>Order Confirmation Number:</td>
                        <td>{bookingData.confirmationCode}</td>
                    </tr>
                </table>
            </section>

            <section className='ticket-info'>
                <table>
                    <tr>
                        <td>Ticket Type:</td>
                        <td>{bookingData.tickets.map((ticket: any) => ticket.type).join(', ')}</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>${(bookingData.totalCost / 100).toFixed(2)}</td>
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
