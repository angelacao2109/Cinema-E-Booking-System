import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Showtime.css';

type Theatre = {
  id:number
}

type Showtime = {
  id:number;
  dateTime: string;
  bookings: string;
  theatre: string; 
  movie: string;
};

type MovieWithShowtime = {
  movieId: number;
  movieTitle: string;
  showtimes: Showtime[];
};

const authToken = document.cookie
.split("; ")
.find((row) => row.startsWith("authToken="))
?.split("=")[1];

const Showtime: React.FC = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movieWithShowtimes, setMovieWithShowtimes] = useState<MovieWithShowtime[]>([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/movie/getAllMovies', {headers: {Authorization: authToken}});
        if (response.status == 200) {
          setMovieWithShowtimes(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchShowtimes();
  }, []);


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
          {movieWithShowtimes.map((movieWithShowtimes) => (
            <li key={movieWithShowtimes.movieId}>
              Movie ID: {movieWithShowtimes.movieId}, Title: {movieWithShowtimes.movieTitle}
              <ul>
                {movieWithShowtimes.showtimes.map((showtimes) => (
                  <li key={showtimes.id}>
                    Showtime: {showtimes.dateTime}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Showtime;