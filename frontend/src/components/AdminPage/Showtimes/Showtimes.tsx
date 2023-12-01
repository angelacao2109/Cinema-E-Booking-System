/* 

This is just a template for our add showtime page. I'm not too
entirely sure what other properties are needed. 

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Showtime.css';

type Showtime = {
  id: string;
  movieId: string;
  time: string;
  theatreId: string; 
};

const Showtime: React.FC = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);


  return (
    <div className='showtime-container'>
      <div className='showtime-header'>
        Showtimes
        <Link to='/admin/addshowtime'>
            <button className='add-showtime-button'>
            Add Showtime
            </button>
        </Link>
      </div>
      <div className='showtime-list'>
        <ul>
          {showtimes.map((showtime) => (
            <li key={showtime.id}>
              Movie ID: {showtime.movieId}, Time: {showtime.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Showtime;
