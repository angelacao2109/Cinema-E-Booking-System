import React, { useState, useEffect } from "react";
import "./SeatSelection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Props {
  maxSeats: number;
  showtimeID: number;
}

interface SeatDto {
  seatRow: number;
  seatCol: number;
  booked: boolean;
}

function SeatSelection({ maxSeats, showtimeID }: Props) {
  const totalRows = 10;
  const totalSeatsPerRow = 20;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/showtimes/seats?showtimeID=${showtimeID}`)
      .then(response => {
        const occupied = response.data['Unavailable Seats']
          .filter((seat: SeatDto) => seat.booked)
          .map((seat: SeatDto) => `${seat.seatRow}-${seat.seatCol}`);
        setOccupiedSeats(occupied);
      })
      .catch(error => {
        console.error('Error fetching occupied seats:', error);
      });
  }, [showtimeID]);


  const isSeatOccupied = (seatId: string) => occupiedSeats.includes(seatId);

  const toggleSeat = (row: number, seat: number) => {
    const seatId = `${row}-${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
      setErrorMessage("");
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats((prev) => [...prev, seatId]);
      if (selectedSeats.length === maxSeats - 1) {
        setErrorMessage("You have selected the maximum number of seats.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("You selected too many seats.");
      return;
    }
  };

  const calculateTicketCounts = (selectedSeats) => { // placeholder to tickets backend for later
    return {
      adult: selectedSeats.length, 
      kids: 0,
      senior: 0
    };
  };

  const handleConfirm = () => {
    console.log("Seats selected: ", selectedSeats);
    const ticketCounts = calculateTicketCounts(selectedSeats); 
  navigate("/checkout", { state: { selectedSeats, showtimeID, ticketCounts } });
};
  

  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="screen">SCREEN</div>
      <div className="seat-grid">
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="row-label">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            {Array.from({ length: totalSeatsPerRow }).map((_, seatIndex) => {
              const seatId = `${rowIndex}-${seatIndex}`;
              return (
                <button
                  key={seatIndex}
                  className={`seat 
                    ${selectedSeats.includes(seatId) ? "selected" : ""}
                    ${isSeatOccupied(seatId) ? "occupied" : ""}`}
                  onClick={() => toggleSeat(rowIndex, seatIndex)}
                  disabled={isSeatOccupied(seatId)}
                >
                  {`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm Selection
      </button>
    </div>
  );
}

export default SeatSelection;
