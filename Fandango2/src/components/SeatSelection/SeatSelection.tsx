import React, { useState } from 'react';
import './SeatSelection.css';
import { useNavigate } from 'react-router-dom';
function SeatSelection() {

  const totalRows = 10;
  const totalSeatsPerRow = 15;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (row: number, seat: number) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  }
  
  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="screen">SCREEN</div>
      <div className="seat-grid">
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="row-label">{String.fromCharCode(65 + rowIndex)}</div>
            {Array.from({ length: totalSeatsPerRow }).map((_, seatIndex) => (
              <button 
                key={seatIndex} 
                className={`seat ${selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''}`} 
                onClick={() => toggleSeat(rowIndex, seatIndex)}
              ></button>
            ))}
          </div>
        ))}
      </div>
      
      <button className="confirm-btn">Confirm Selection</button>
    </div>
  
  );
}

export default SeatSelection;
