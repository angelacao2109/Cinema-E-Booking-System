import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddShowtime.css';

type Showtime = {
  movieId: string;
  theatreId: string;
  showDate: string; // Optional showDate
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
    movieId: '',
    showDate: '',
    theatreId: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShowtime(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("ran!")
    e.preventDefault();
    if (newShowtime.movieId.trim() === '' || newShowtime.showDate.trim() === '' || newShowtime.theatreId.trim() === '') {
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
      const response = await axios.post('http://localhost:8080/api/showtime',
      {
        movieId:postData.movieId,
        theatreId:postData.theatreId,
        showDate:postData.showDate
      }
      , {headers: {Authorization: authToken}});
      console.log(response.data);
      alert('Showtime successfully added');
      setNewShowtime({movieId: '', showDate: '', theatreId: '' });
      navigate('/admin/showtime');  // Navigate to the movies page upon successful addition
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
            type='datetime-local'
            id='showDate'
            name='showDate'
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
          <button className='add-showtime-btn' type='submit'>
            Add Showtime
          </button>
        </form>
      </div>
    </>
  );
};

export default AddShowtime;