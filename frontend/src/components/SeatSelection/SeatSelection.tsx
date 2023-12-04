import React, { useState, useEffect } from "react";
import "./SeatSelection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation, useParams} from "react-router-dom";

interface Props {
  maxSeats: number;
  showtimeID: number;
}

interface SeatDto {
  seatRow: number;
  seatCol: number;
  booked: boolean;
}

const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

function SeatSelection({ maxSeats }: Props) {
  const totalRows = 10;
  const totalSeatsPerRow = 20;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  const params = useParams<{ showtimeID: string }>();
  const showtimeID = parseInt(params.showtimeID, 10);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/showtime/seats?showtimeID=${showtimeID}`, { headers: {'Authorization': authToken } })
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

  const location = useLocation();
  const { tickets } = location.state as {
    tickets: { kids: number; adult: number; senior: number };
  };

  const handleConfirm = () => {
    console.log("Seats selected: ", selectedSeats);
    const ticketCounts = calculateTicketCounts(selectedSeats);
    navigate(`/checkout/${showtimeID}`, {
      state: { selectedSeats, showtimeID, ticketCounts, tickets } // Pass the tickets data to Checkout
    });
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
