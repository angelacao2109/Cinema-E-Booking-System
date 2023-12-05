import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SelectTicket.css";
import axios from "axios";

interface Props {
  onTicketChange: (count: number) => void;
}

const ticketPrices = {
  kids: 5,
  adult: 10,
  senior: 7,
};

const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

const SelectTicket: React.FC<Props> = ({ onTicketChange }) => {
  const params = useParams<{ showtimeID: string }>();
  const showtimeID = parseInt(params.showtimeID, 10); // Convert the showtimeID to a number
  
  const [tickets, setTickets] = useState({
    kids: 0,
    adult: 0,
    senior: 0,
  });

  const navigate = useNavigate();

  const changeTicketCount = (
    category: keyof typeof tickets,
    amount: number
  ) => {
    setTickets((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] + amount),
    }));
  };

  const fetchTicketPrices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/booking/prices', { headers: {'Authorization': authToken } });
      if (response.status == 200) {
        ticketPrices.adult = Number(response.data.ADULT)/100;
        ticketPrices.kids = Number(response.data.CHILD)/100;
        ticketPrices.senior = Number(response.data.SENIOR)/100;
      }
    } catch (error) {
      console.log(error)
    }
  };

  fetchTicketPrices();

  useEffect(() => {
    const totalCount = Object.values(tickets).reduce(
      (acc, curr) => acc + curr,
      0
    );

    onTicketChange(totalCount);
  }, [tickets]);

  const handleConfirmClick = () => {
    onTicketChange(Object.values(tickets).reduce((acc, curr) => acc + curr, 0)); 
    navigate(`/seats/${showtimeID}`, {
      state: { 
        showtimeID, 
        tickets 
      }
    });
  };

  return (
    <div className="app-container">
      <div className="ticket-selector">
        <button className="close-btn" onClick={() => navigate("/")}>
          X
        </button>
        {Object.entries(ticketPrices).map(([category, price]) => (
          <div key={category} className="ticket-category">
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <button
              onClick={() =>
                changeTicketCount(category as keyof typeof tickets, -1)
              }
            >
              -
            </button>
            <span
              className="ticket-count"
              style={{
                display: "inline-block",
                width: "30px",
                textAlign: "center",
              }}
            >
              {tickets[category as keyof typeof tickets]}
            </span>
            <button
              onClick={() =>
                changeTicketCount(category as keyof typeof tickets, 1)
              }
            >
              +
            </button>
            <span>${(price * tickets[category as keyof typeof tickets]).toFixed(2)}</span>
          </div>
        ))}
        <div className="confirm-container">
          <button onClick={handleConfirmClick} className="confirm-btn">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;