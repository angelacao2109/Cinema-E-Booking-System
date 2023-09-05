import React, { useState } from 'react';

type Seat = {
  row: number;
  column: number;
};

type SeatChartProps = {
  rows: number;
  columns: number;
};

const SeatSelection: React.FC<SeatChartProps> = ({ rows, columns }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const toggleSeatSelection = (row: number, column: number) => {
    const seatIndex = selectedSeats.findIndex(
      (seat) => seat.row === row && seat.column === column
    );

    if (seatIndex !== -1) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (seat) => !(seat.row === row && seat.column === column)
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { row, column },
      ]);
    }
  };

  return (
    <div>
      <div>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {Array.from({ length: columns }, (_, columnIndex) => (
              <div
                key={columnIndex}
                onClick={() => toggleSeatSelection(rowIndex, columnIndex)}
                style={{
                  padding: 10,
                  border: '1px solid #ccc',
                  backgroundColor: selectedSeats.some(
                    (seat) => seat.row === rowIndex && seat.column === columnIndex
                  )
                    ? 'green'
                    : 'white',
                }}
              >
                {rowIndex + 1}-{columnIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Selected Seats</h2>
        <ul>
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              Row: {seat.row + 1}, Column: {seat.column + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatSelection;
