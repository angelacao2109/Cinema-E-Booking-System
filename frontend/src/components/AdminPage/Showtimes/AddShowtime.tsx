import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddShowtime.css';

type Showtime = {
  id: string;
  movieId: string;
  time: string;
  theatreId: string;
  showDate?: string; // Optional showDate
};

const authToken = document.cookie
.split("; ")
.find((row) => row.startsWith("authToken="))
?.split("=")[1];

const email = document.cookie
.split("; ")
.find((row) => row.startsWith("userEmail="))
?.split("=")[1];

const AddShowtime: React.FC = () => {
  const [newShowtime, setNewShowtime] = useState<Showtime>({
    id: '',
    movieId: '',
    time: '',
    theatreId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the input is for 'time', update the time in newShowtime
    if (name === 'time') {
      setNewShowtime((prev) => ({ ...prev, [name]: value }));
    } else {
      // If the input is for 'showDate', parse the date and set showDate in newShowtime
      const showDate = new Date(`${value}T${newShowtime.time}`);
      setNewShowtime((prev) => ({ ...prev, showDate: showDate.toISOString() }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newShowtime.movieId.trim() === '' || newShowtime.time.trim() === '' || newShowtime.theatreId.trim() === '') {
      alert('Please enter both Movie ID and Showtime.');
      return;
    }

    
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); // 15 minutes from the current time

   

    const postData = {
      movieId: parseInt(newShowtime.movieId),
      theatreId: parseInt(newShowtime.theatreId),
      showDate: newShowtime.showDate,
    };

    try {
      const response = await axios.post('/api/showtime', postData, {headers: {Authorization: authToken}});
      console.log(response.data);
      alert('Showtime successfully added');
      setNewShowtime({ id: '', movieId: '', time: '', theatreId: '' });
    } catch (error) {
      console.error('Error adding showtime:', error);
      alert('Failed to add showtime');
    }
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
          <label className='add-showtime-label' htmlFor='movieId'>
            Movie ID:
          </label>
          <input
            className='add-showtime-input'
            type='text'
            id='movieId'
            name='movieId'
            value={newShowtime.movieId}
            onChange={handleInputChange}
            required
          />

          <label className='add-showtime-label' htmlFor='showDate'>
            Show Date:
          </label>
          <input
            className='add-showtime-input'
            type='date'
            id='showDate'
            name='showDate'
            //onChange={handleInputChange}
            required
          />

          <label className='add-showtime-label' htmlFor='time'>
            Showtime:
          </label>
          <input
            className='add-showtime-input'
            type='time'
            id='time'
            name='time'
            value={newShowtime.time}
            onChange={handleInputChange}
            required
          />

          <label className='add-showtime-label' htmlFor='theatreId'>
            Theatre ID:
          </label>
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
            <button className='add-showtime-btn' type='submit'>
              Add Showtime
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddShowtime;
