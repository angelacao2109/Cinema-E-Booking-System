import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ticketPrices = {
  kids: 5,
  adult: 10,
  senior: 7
};

interface Card {
  id: number;
  firstname: string;
  lastname: string;
  cardNumber: string;
  expDate: string;
  CVV: string;
  address: string;
};

interface Ticket {
  type: String;
  seatCol: number;
  seatRow: number;
};

const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

const email = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userEmail="))
  ?.split("=")[1];

const Checkout: React.FC = () => {

  const params = useParams<{ showtimeID: string }>();
  const showtimeID = parseInt(params.showtimeID, 10);
  
  const [userCards, setUserCards] = useState<Card[]>([]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    address: '',
  });

  const [addNewCard, setAddNewCard] = useState(false);

  const [chosenCardID, setChosenCardID] = useState(-1);

  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  
  const [isPromoValid, setIsPromoValid] = useState<boolean>(true); 


  const location = useLocation();
  const { selectedSeats, ticketCounts, tickets } = location.state as {
    selectedSeats: string[];
    ticketCounts: { [key: string]: number };
    tickets: { kids: number; adult: number; senior: number };
  };

  let assignedTickets: Ticket[] = [];
  
  const assignTickets = () => {
    let seatIndex = 0;

    const assign = (type: string, count: number) => {
      for (let i = 0; i < count && seatIndex < selectedSeats.length; i++) {
        const [seatCol, seatRow] = selectedSeats[seatIndex].split("-").map(Number);
        assignedTickets.push({
          type,
          seatCol,
          seatRow,
        });
        seatIndex++;
      }
    };

    assign("CHILD", tickets.kids);
    assign("ADULT", tickets.adult);
    assign("SENIOR", tickets.senior);
  };

  assignTickets();


  const fetchUserCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/profile?email=${email}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
            "Referrer-Policy": "unsafe_url",
          },
        }
      );
      setUserCards(response.data.paymentCards);
      setUserData(response.data)
      console.log(userCards)
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
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

  useEffect(() => {
    fetchUserCards();
    fetchTicketPrices()
  }, [selectedSeats, tickets]);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    Email: '',
    Address: '',
    PromoCode: '',
    CreditCardNumber: '',
    ExpiryDate: '',
    CVV: ''
  });

  const [promoCode, setPromoCode] = useState('');

  const applyPromoCode = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/promotion?code=${promoCode}`, {
        headers: { Authorization: authToken }
      });
      if (response.data && response.data.percentageOff) {
        setDiscountPercentage(response.data.percentageOff);
        setIsPromoValid(true);
      } else {
        setIsPromoValid(false);
        setDiscountPercentage(0); 
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      setIsPromoValid(false);
      setDiscountPercentage(0);
    }
  };

  let total = 0;
  for (let ticketType in ticketCounts) {
    total += ticketCounts[ticketType] * ticketPrices[ticketType];
  }
  
  if (isPromoValid && discountPercentage > 0) {
    total -= total * (discountPercentage);
  }
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:8080/api/user/profile/card?email=${email}`,
        {
          cvv: newCard.cvv,
          firstName: newCard.firstName,
          lastName: newCard.lastName,
          cardNumber: newCard.cardNumber,
          expDate: newCard.expDate,
          billingAddress: newCard.address
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        fetchUserCards()
        setAddNewCard(false)
      }
    } catch (error) {
      console.error("Error saving card info:", error);
    }
  }

  const handleCardSelection = async (cardID:number) => {
    setAddNewCard(false);
    setChosenCardID(cardID); 
  }


  interface BookingData {
    showtimeID: number;
    paymentCardID: number;
    tickets: Ticket[];
    promoCode?: string;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {

    const bookingData: BookingData = {
      showtimeID: showtimeID,
      paymentCardID: chosenCardID,
      tickets: assignedTickets,
    };
    
    if (promoCode !== "") {
      bookingData.promoCode = promoCode;
    }

    const response = await axios.post(
      `http://localhost:8080/api/booking?email=${email}`,
      bookingData,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    if (response.data) {
      navigate("/confirmation", { state: { bookingData: response.data } });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h1>Checkout</h1>
      <div className="summary">
        <h4>Order Total: ${total}</h4>
        <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
      </div>
      <div className="container">
        <div className="personal-info">
          <h2>Personal Information</h2>
          <InputField label="First Name:" name="firstName" value={userData.firstName} onChange={handleChange} />
          <InputField label="Last Name:" name="lastName" value={userData.lastName} onChange={handleChange} />
          <InputField label="Address:" name="address" value={userData.Address} onChange={handleChange} />
          <InputField label="Email:" name="email" value={userData.Email} onChange={handleChange} />
        </div>
        <div className="promo-code-section">
        <div className="promo-code-section">
        <InputField 
          label="Promo Code:" 
          name="promoCode" 
          value={promoCode} 
          onChange={(e) => setPromoCode(e.target.value)} 
        />
        <button type="button" onClick={applyPromoCode}>Apply Promo Code</button>
        {!isPromoValid && <p>Promo code is invalid</p>}
      </div>
      <h4>Order Total: ${total.toFixed(2)}</h4>
        </div>
        <div className="payment-method-selection">
          <h2>Select Payment Method</h2>
          {userCards.length > 0 && (
            userCards.map((card, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`card-${index}`}
                  name="selectedCard"
                  value={card.id}
                  onChange={() => handleCardSelection(card.id)}
                />
                <label htmlFor={`card-${index}`}>
                  {`**** **** **** ${card.cardNumber.slice(0,4)} (Expires: ${card.expDate})`}
                </label>
              </div>
            ))
          )}

          <div>
            <input
              type="radio"
              id="new-card-option"
              name="selectedCard"
              value="newCard"
              onChange={() => setAddNewCard(true)}
            />

            <label htmlFor="new-card-option">Use a different card</label>
          </div>
          {addNewCard && (
            <div className="new-card-info">
              <InputField label="First Name:" name="firstName" value={newCard.firstName} onChange={(e) => setNewCard({ ...newCard, firstName: e.target.value })} />
              <InputField label="Last Name:" name="lastName" value={newCard.lastName} onChange={(e) => setNewCard({ ...newCard, lastName: e.target.value })} />
              <InputField label="Card Number:" name="cardNumber" value={newCard.cardNumber} onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })} />
              <InputField label="Expiry Date:" name="expDate" value={newCard.expDate} onChange={(e) => setNewCard({ ...newCard, expDate: e.target.value })} />
              <InputField label="CVV:" name="cvv" value={newCard.cvv} onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })} />
              <InputField label="Address:" name="address" value={newCard.address} onChange={(e) => setNewCard({ ...newCard, address: e.target.value })} />
              <button type='button' onClick={handleAddCard}>Add Card</button>
            </div>
          )}
        </div>
      </div>
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

const InputField = ({ label, name, value, onChange }: any) => (
  <div className="input-field">
    <label>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} />
  </div>
);

export default Checkout;