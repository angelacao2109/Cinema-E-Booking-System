import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectTicket.css";
import { useLocation } from "react-router-dom";

interface Props {
  onTicketChange: (count: number) => void;
}

const ticketPrices = {
  kids: 5,
  adult: 10,
  senior: 7,
};

const SelectTicket: React.FC<Props> = ({ onTicketChange }) => {
  const location = useLocation();
  const { showtimeID } = location.state as { showtimeID: number };
  
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

  useEffect(() => {
    // Compute the total ticket count here
    const totalCount = Object.values(tickets).reduce(
      (acc, curr) => acc + curr,
      0
    );
    onTicketChange(totalCount);
  }, [tickets]);

  const handleConfirmClick = () => {
    onTicketChange(Object.values(tickets).reduce((acc, curr) => acc + curr, 0)); // This updates the parent component with total ticket count
    navigate("/seats"); // Navigating to SeatSelection
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
            <span>${price * tickets[category as keyof typeof tickets]}</span>
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
