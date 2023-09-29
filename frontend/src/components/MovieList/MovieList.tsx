import React, { useState, useEffect } from 'react';
import './MovieList.css';
import SeatSelection from '../SeatSelection/SeatSelection';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Embed from 'react-embed';


type Movie = {
trailerPictureUrl: string;
  title: string;
  category: string;
  cast: string[];
  director: string;
  producer: string;
  synopsis: string;
  reviews: string[];
  rating: string;
  trailerPicture: string;
  trailerVideoUrl: string;
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
          const response = await axios.get('http://localhost:8080/api/movie/homepage');
          setMovieData(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }, []);

    return (
        <div className="movie-list">
            <h2 style={{ color: '#CF291D' }}>Available Movies</h2>
            <div className="movies-grid">
                {movieData.map((movie, index) => (
                    <div key={index} className="movie-item">
                       <div className="movie-poster-wrapper">
    <img src={movie.trailerPictureUrl} alt={`${movie.title} poster`} className="movie-poster"/>
                        </div>
                        <div className="movie-details">
                        <h3>{movie.title}</h3>
                        <p><strong>Category:</strong> {movie.category}</p>
                         <p><strong>Cast:</strong> {movie.cast}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Producer:</strong> {movie.producer}</p>
                        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
                        <p><strong>Reviews:</strong> {movie.reviews.join(', ')}</p>
                        <p><strong>MPAA Rating:</strong> {movie.rating}</p>
                        </div>
                        <div className="embeded-videos">    <iframe
     width="200"
     height="100"
      src={movie.trailerVideoUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
                        </div>
                        <button onClick={() => {
                            const win = window.open(movie.trailerVideoUrl, movie.trailerVideoUrl);
                            win?.focus();
                        }} className="showtime-btn">Watch Trailer</button>
                        
                    
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default MovieList;
