import React, { useState } from 'react';
import './SeatSelection.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  maxSeats: number;
  occupiedSeats?: string[];  
}

function SeatSelection({ maxSeats, occupiedSeats = [] }: Props) {
  const totalRows = 10;
  const totalSeatsPerRow = 15;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isSeatOccupied = (seatId: string) => occupiedSeats.includes(seatId);

  const navigate = useNavigate(); // define navigate here

  const toggleSeat = (row: number, seat: number) => {
    const seatId = `${row}-${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
      setErrorMessage('');
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats(prev => [...prev, seatId]);
      if (selectedSeats.length === maxSeats - 1) {
        setErrorMessage('You have selected the maximum number of seats.');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('You selected too many seats.');
      return;
    }
  };

  const handleConfirm = () => {
    console.log("Seats selected: ", selectedSeats);
    navigate('/checkout', { state: { selectedSeats: selectedSeats } });
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
                    ${isSeatOccupied(seatId) ? 'occupied' : ''}`}
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
      <button className="confirm-btn" onClick={handleConfirm}>Confirm Selection</button>
    </div>
  );
}

export default SeatSelection;
