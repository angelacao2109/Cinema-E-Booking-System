import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditPromo.css';

// Define a type for the props
type EditPromoProps = {
    onEditPromo: (promo: Promo) => void;
};

// Define a type for the promo object
type Promo = {
    name: string;
    startDate: string;
    endDate: string;
    code: string;
    discount: number;
    status: string;
};

const EditPromo: React.FC<EditPromoProps> = ({ onEditPromo }) => {
  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [status, setStatus] = useState<string>('');

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch(`http://localhost:5173/api/promo/${id}`);
        const data: Promo = await response.json();
        setName(data.name);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setCode(data.code);
        setDiscount(data.discount);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching promo:', error);
      }
    };

    fetchPromo();
  }, [id]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedPromo: Promo = {
      name,
      startDate,
      endDate,
      code,
      discount,
      status,
    };

    try {
      const response = await fetch(`http://localhost:5173/api/promo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPromo),
      });

      if (response.ok) {
        const updatedPromo = await response.json();
        onEditPromo(updatedPromo);
        navigate('/promopage');
      } else {
        console.error('Failed to update promo');
      }
    } catch (error) {
      console.error('Error updating promo:', error);
    }
  };

  return (
    <>
      <div className='link-container'>
        <Link to='/promopage' className='link-styles'>
          Exit Edit Promo Page
        </Link>
      </div>

      <div className='edit-promo-header'>Edit Promo</div>

      <form className='edit-promo-form' onSubmit={handleEdit}>
        <label className='edit-promo-label'>Name:</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

        <label className='edit-promo-label'>Start Date:</label>
        <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label className='edit-promo-label'>End Date:</label>
        <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <label className='edit-promo-label'>Code:</label>
        <input type='text' value={code} onChange={(e) => setCode(e.target.value)} />

        <label className='edit-promo-label'>Discount:</label>
        <input type='number' value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />

        <label className='edit-promo-label'>Status:</label>
        <select
          className='edit-promo-input'
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value=''>Select Status</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>

        <button className='edit-promo-btn' type='submit'>
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditPromo;
