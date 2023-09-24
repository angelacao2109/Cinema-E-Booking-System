import React, { useState, useEffect } from 'react';
import './MovieList.css';
import SeatSelection from '../SeatSelection/SeatSelection';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



type Movie = {
  thumbnail: string;
  title: string;
  category: string;
  cast: string[];
  director: string;
  producer: string;
  synopsis: string;
  reviews: string[];
  mpaaRating: string;
  trailerPicture: string;
  trailerVideo: string;
  trailer: string;
  showtimes: Showtime[];
};

type Showtime = {
  date: string;
  times: string[];
};

const MovieList: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [selectedShowtime, setSelectedShowtime] = useState<{ movieIndex: number, date: string, time: string } | null>(null);
  

  useEffect(() => {
    const fetchMovies = async () => {
        try {
          const response = await axios.get('/api/movies');
          setMovieData(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }, []);

    return (
        <div className="movie-list">
            <h2>Available Movies</h2>
            <div className="movies-grid">
                {movieData.map((movie, index) => (
                    <div key={index} className="movie-item">
                        <img src={movie.thumbnail} alt={`${movie.title} poster`} className="movie-poster"/>
                        <h3>{movie.title}</h3>
                        <p><strong>Category:</strong> {movie.category}</p>
                        <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Producer:</strong> {movie.producer}</p>
                        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
                        <p><strong>Reviews:</strong> {movie.reviews.join(', ')}</p>
                        <p><strong>MPAA Rating:</strong> {movie.mpaaRating}</p>
                        <img src={movie.trailerPicture} alt="Trailer thumbnail" />
                        <video src={movie.trailerVideo} controls>Trailer not supported</video>
                        <button onClick={() => {
                            const win = window.open(movie.trailer, '_blank');
                            win?.focus();
                        }} className="showtime-btn">Watch Trailer</button>
                        
                        {movie.showtimes.map((showtime: Showtime, showtimeIndex: number) => (
                            <div key={showtimeIndex}>
                                <p>Show Date: {showtime.date}</p>
                                {showtime.times.map((time: string, timeIndex: number) => (
                                    <button 
                                        key={timeIndex} 
                                        className="showtime-btn"
                                        onClick={() => {
                                            setSelectedShowtime({ movieIndex: index, date: showtime.date, time });
                                            navigate(`/ticket-selection/${index}/${showtime.date}/${time}`);
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default MovieList;
