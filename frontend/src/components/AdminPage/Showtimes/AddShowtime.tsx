import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddShowtime.css';

type Showtime = {
  id: string;
  movieId: string;
  time: string;
  theatreId: string; // need to assign movie to a theatre room 
};

type AddShowtimeFormProps = {
  onAddShowtime: (newShowtime: Showtime) => void;
};

const AddShowtime: React.FC<AddShowtimeFormProps> = ({ onAddShowtime }) => {
  const [newShowtime, setNewShowtime] = useState<Showtime>({
    id: '',
    movieId: '',
    time: '',
    theatreId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShowtime((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShowtime.movieId.trim() === '' || newShowtime.time.trim() === ''|| newShowtime.theatreId.trim() === '') {
      alert('Please enter both Movie ID and Showtime.');
      return;
    }
    const showtimeDate = new Date(newShowtime.time);
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); // doing this so you cant schedule a movie 15 mins before current time 

    if (showtimeDate < now) {
      alert('Showtime must be at least 15 minutes from the current time.');
      return;
    }

    newShowtime.id = Date.now().toString();
    onAddShowtime(newShowtime);
    setNewShowtime({ id: '', movieId: '', time: '',  theatreId: ''  });
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

      <label className='add-showtime-label' htmlFor='theatreId'>Theatre ID:</label>
          <input
            className='add-showtime-input'
            type='text'
            id='theatreId'
            name='theatreId'
            value={newShowtime.theatreId}
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
