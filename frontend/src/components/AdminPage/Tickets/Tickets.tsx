import React, { useState } from 'react';

interface Ticket {
  type: string;
  price: number;
}

const TicketPrices: React.FC = () => {
  const initialTicketPrices: Ticket[] = [
    { type: 'Adult', price: 18.00 },
    { type: 'Child', price: 10.00 },
    { type: 'Senior', price: 15.00 },
  ];

  const [ticketPrices, setTicketPrices] = useState<Ticket[]>(initialTicketPrices);

  const handlePriceChange = (type: string, newPrice: number) => {
    setTicketPrices((prevPrices) =>
      prevPrices.map((ticket) =>
        ticket.type === type ? { ...ticket, price: newPrice } : ticket
      )
    );
  };

  return (
    <div>
      <h1>Ticket Prices</h1>
      <ul>
        {ticketPrices.map((ticket, index) => (
          <li key={index}>
            <div>
              {ticket.type} Ticket Price: ${ticket.price.toFixed(2)}
              <input
                type="number"
                value={ticket.price}
                onChange={(e) => handlePriceChange(ticket.type, parseFloat(e.target.value))}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <TicketPrices />
    </div>
  );
};

export default App;
