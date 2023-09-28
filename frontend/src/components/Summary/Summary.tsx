import React from 'react';
import './Summary.css';

const OrderHistory: React.FC = () => {
    const orders = [
        {
            movieName: "Movie A",
            seats: ["A1", "A2"],
            date: "10-01-2023",
            time: "15:00",
            tickets: [
                { type: 'Adult', quantity: 1, cost: "$15" },
                { type: 'Child', quantity: 1, cost: "$10" }
            ],
            total: "$25"
        },
        {
            movieName: "Movie B",
            seats: ["B1", "B2", "B3"],
            date: "09-12-2023",
            time: "18:00",
            tickets: [
                { type: 'Adult', quantity: 2, cost: "$30" },
                { type: 'Senior', quantity: 1, cost: "$10" }
            ],
            total: "$40"
        }
        // ... more orders
    ];

    return (
      
        <div className='summary-container'>
            <h1>Order History</h1>
            
            {orders.map((order, index) => (
                <div key={index} className="order-item">
                    <h2>{order.movieName}</h2>
                    <h3>Date and Time: {order.date} at {order.time}</h3>
                    <p>Seats: {order.seats.join(", ")}</p>
                    <ul>
                        {order.tickets.map((ticket, tIndex) => (
                            <li key={tIndex}>
                                {ticket.type}: {ticket.quantity} - {ticket.cost}
                            </li>
                        ))}
                    </ul>
                    <p>Total: {order.total}</p>
                    <hr />
                </div>
            ))}

        </div>
    );
};

export default OrderHistory;
