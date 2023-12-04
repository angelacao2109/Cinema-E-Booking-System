import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieInfo.css';

// Define a type for the movie object
type Movie = {
    moviePoster?: string;
    title?: string;
    director?: string[];
    producer?: string[];
    cast?: string[];
    synopsis?: string;
    reviews?: string;
    trailerUrl?: string;
    rating?: string;
    genre?: string[];
    releaseYear?: string;
    status?: string;
};

const MovieInfo: React.FC = () => {
    const [movie, setMovie] = useState<Movie>({});
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5173/api/movie/${id}`);
                const data: Movie = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]);

    return (
        <>
    <img className="movie-poster" src={movie.moviePoster} alt={`${movie.title} Poster`} />
    <div className="movie-info-container">

      {movie.trailerUrl && (
        <div className="iframe-container">
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
            title={`${movie.title} Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p><strong>Director:</strong> {movie.director && movie.director.join(', ')}</p>
        <p><strong>Producer:</strong> {movie.producer && movie.producer.join(', ')}</p>
        <p><strong>Cast:</strong> {movie.cast && movie.cast.join(', ')}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
        <p><strong>Reviews:</strong> {movie.reviews}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Genre:</strong> {movie.genre && movie.genre.join(', ')}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Status:</strong> {movie.status}</p>
        {/* FIXED ROUTE */}
        <Link to='/admin/moviespage' className="link-button">Exit Movie Information Page</Link>
      </div>
    </div>
    </>
  );
};

export default MovieInfo;
