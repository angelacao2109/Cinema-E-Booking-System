import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddShowtime.css';

type Showtime = {
  id: string;
  movieId: string;
  time: string;
};

type AddShowtimeFormProps = {
  onAddShowtime: (newShowtime: Showtime) => void;
};

const AddShowtime: React.FC<AddShowtimeFormProps> = ({ onAddShowtime }) => {
  const [newShowtime, setNewShowtime] = useState<Showtime>({
    id: '',
    movieId: '',
    time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShowtime((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShowtime.movieId.trim() === '' || newShowtime.time.trim() === '') {
      alert('Please enter both Movie ID and Showtime.');
      return;
    }
    newShowtime.id = Date.now().toString();
    onAddShowtime(newShowtime);
    setNewShowtime({ id: '', movieId: '', time: '' });
  };

  return (
    <>
    <div className='add-showtime-exit-link-container'>
        <Link to='/admin/showtime' className='add-showtime-exit-link-styles'>
            Exit Add Movie Page
        </Link>
    </div>
    <div className='add-showtime-container'>
    <div className='add-showtime-header'>Add Movie Showtime</div>
    <form className='add-showtime-from' onSubmit={handleSubmit}>
      <label className='add-showtime-label' htmlFor='movieId'>Movie ID:</label>
      <input
        className='add-showtime-input'
        type='text'
        id='movieId'
        name='movieId'
        value={newShowtime.movieId}
        onChange={handleInputChange}
        required
      />

      <label className='add-showtime-label' htmlFor='time'>Showtime:</label>
      <input
        className='add-showtime-input'
        type='text'
        id='time'
        name='time'
        value={newShowtime.time}
        onChange={handleInputChange}
        required
      />

      <Link to='/admin/showtime'>
        <button className='add-showtime-btn' type='submit'>Add Showtime</button>
      </Link>
    </form>
    </div>
    </>
  );
};

export default AddShowtime;
