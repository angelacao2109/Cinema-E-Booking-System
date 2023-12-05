import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderHistory.css";



interface Ticket {
  type: string;
  seatCol: number;
  seatRow: number;
}

interface Movie {
  title: string;
 
}

interface Showtime {
  showDate: string; 
  
}

interface Order {
  orderTime: string;
  movie: Movie;
  showtime: Showtime;
  tickets: Ticket[];
  totalCost: number;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

  const email = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userEmail="))
  ?.split("=")[1];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ history: Order[] }>(`http://localhost:8080/api/booking/orders?userEmail=${email}`, {
          headers: { Authorization: authToken }
        });
        setOrders(response.data.history);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="summary-container">
      <h1>Order History</h1>

      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <h2>{order.movie.title}</h2>
          <h3>
            Order Date and Time: {formatDate(order.showtime.showDate)}
          </h3>
          <p>Seats: {order.tickets.map(t => `${String.fromCharCode(64 + t.seatRow)}${t.seatCol}`).join(", ")}</p>
          <ul>
            {order.tickets.map((ticket, tIndex) => (
              <li key={tIndex}>
                {ticket.type} - Seat: {String.fromCharCode(64 + ticket.seatRow)}{ticket.seatCol}
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