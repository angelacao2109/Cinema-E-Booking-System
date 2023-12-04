import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderHistory.css";


interface Ticket {
  type: string;
  seatRow: string;
  seatCol: number;
}

interface Movie {
  title: string;
  
}

interface Showtime {
  date: string;
  time: string;

}

interface Order {
  movie: Movie;
  showtime: Showtime;
  tickets: Ticket[];
  totalCost: number;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

 
  const authToken = /* retrieve auth token method */;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ history: Order[] }>('http://localhost:8080/api/orders', {
          headers: { Authorization: authToken }
        });
        setOrders(response.data.history);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="summary-container">
      <h1>Order History</h1>

      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <h2>{order.movie.title}</h2>
          <h3>
            Date and Time: {order.showtime.date} at {order.showtime.time}
          </h3>
          <p>Seats: {order.tickets.map(t => `${t.seatRow}${t.seatCol}`).join(", ")}</p>
          <ul>
            {order.tickets.map((ticket, tIndex) => (
              <li key={tIndex}>
                {ticket.type}: {/* Quantity and cost information here */}
              </li>
            ))}
          </ul>
          <p>Total: ${(order.totalCost / 100).toFixed(2)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
