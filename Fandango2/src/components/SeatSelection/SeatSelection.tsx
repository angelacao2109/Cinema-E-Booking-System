import React, { useState } from 'react';
import './SeatSelection.css';
import { useNavigate } from 'react-router-dom';
import SelectTicket from '../SelectTicket/SelectTicket';

interface Props {
  maxSeats: number;
  occupiedSeats?: string[];  
}

function SeatSelection({ maxSeats, occupiedSeats = [] }: Props) {
  const totalRows = 10;
  const totalSeatsPerRow = 15;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const isSeatOccupied = (seatId: string) => occupiedSeats.includes(seatId);


  const toggleSeat = (row: number, seat: number) => {
    const seatId = `${row}-${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };
  const handleConfirm = () => {
    // Handle your confirm logic here. Either send the selected seats to the server or navigate to another page.
    console.log("Seats selected: ", selectedSeats);
    // You can add more actions or navigation logic here
  }

  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="screen">SCREEN</div>
      <div className="seat-grid">
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="row-label">{String.fromCharCode(65 + rowIndex)}</div>
            {Array.from({ length: totalSeatsPerRow }).map((_, seatIndex) => {
              const seatId = `${rowIndex}-${seatIndex}`;
              return (
                <button
                  key={seatIndex}
                  className={`seat 
                    ${selectedSeats.includes(seatId) ? 'selected' : ''} 
                    ${isSeatOccupied(seatId) ? 'occupied' : ''}`}  // Add 'occupied' class if the seat is already taken
                  onClick={() => toggleSeat(rowIndex, seatIndex)}
                  disabled={isSeatOccupied(seatId)}  // Disable the button if the seat is already occupied
                >
                  {`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`} {/* Displaying row and column on seat */}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button className="confirm-btn" onClick={handleConfirm}>Confirm Selection</button>
      {selectedSeats.length >= maxSeats && <p className="max-seats-warning">You have selected the maximum number of seats.</p>}
    </div>
  );
}

export default SeatSelection;
