import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditMovie.css';

// Define a type for the props
type EditMovieProps = {
    onEditMovie: (movie: Movie) => void;
};

// Define a type for the movie object
type Movie = {
    title: string;
    director: string[];
    producer: string[];
    cast: string[];
    synopsis: string;
    reviews: string;
    moviePoster: string;
    trailerUrl: string;
    rating: string;
    genre: string[];
    releaseYear?: string;  // Optional if releaseYear is not used in edit
    status: string;
};

const EditMovie: React.FC<EditMovieProps> = ({ onEditMovie }) => {
    const [title, setTitle] = useState<string>('');
    const [director, setDirector] = useState<string[]>([]);
    const [producer, setProducer] = useState<string[]>([]);
    const [cast, setCast] = useState<string[]>([]);
    const [synopsis, setSynopsis] = useState<string>('');
    const [reviews, setReviews] = useState<string>('');
    const [moviePoster, setMoviePoster] = useState<string>('');
    const [trailerUrl, setTrailerUrl] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [genre, setGenre] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchMovie = async () => {
          try {
            const response = await fetch(`http://localhost:5173/api/movie/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setDirector(Array.isArray(data.director) ? data.director : []);
            setProducer(Array.isArray(data.producer) ? data.producer : []);
            setCast(Array.isArray(data.cast) ? data.cast : []);
            setSynopsis(data.synopsis);
            setReviews(data.reviews);
            setMoviePoster(data.moviePoster);
            setTrailerUrl(data.trailerUrl);
            setRating(data.rating);
            setStatus(data.status);
            setGenre(Array.isArray(data.genre) ? data.genre : []);
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
    

        fetchMovie();
    }, [id]);

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const editedMovie: Movie = {
            title,
            director,
            producer,
            cast,
            synopsis,
            reviews,
            moviePoster,
            trailerUrl,
            rating,
            genre,
            status,
        };

        try {
            const response = await fetch(`http://localhost:5173/api/movie/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(editedMovie),
            });
      
            if (response.ok) {
              const updatedMovie = await response.json();
              onEditMovie(updatedMovie);
            } else {
              console.error('Failed to update movie');
            }
          } catch (error) {
            console.error('Error updating movie:', error);
          }
          navigate('/moviespage');
        };
      
        return (
          <>
            <div className='link-container'>
              <Link to='/moviespage' className='link-styles'>
                Exit Edit Movie Page
              </Link>
            </div>
      
            <div className='edit-movie-header'>Edit Movie</div>
      
            <form className='edit-movie-form' onSubmit={handleEdit}>
              <label className='edit-movie-label'>Title:</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      
              <label className='edit-movie-label'>Director:</label>
              <input
              className='edit-movie-input'
              type='text'
              value={director}
              onChange={(e) => setDirector([e.target.value])} 
              />
      
              <label className='edit-movie-label'>Producer:</label>
              <input
              type='text'
              value={producer}
              onChange={(e) => setProducer([e.target.value])}
              />
      
              <label className='edit-movie-label'>Cast:</label>
              <input
              className='edit-movie-input'
              type='text'
              value={cast}
              onChange={(e) => setCast([e.target.value])}
              />
      
      
              <label className='edit-movie-label'>Synopsis:</label>
              <textarea className='edit-movie-textarea' value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
      
              <label className='edit-movie-label'>Reviews:</label>
              <textarea className='edit-movie-textarea' value={reviews} onChange={(e) => setReviews(e.target.value)} />
      
              <label className='edit-movie-label'>Movie Poster URL:</label>
              <input className='edit-movie-input' type='text' value={moviePoster} onChange={(e) => setMoviePoster(e.target.value)} />
      
              <label className='edit-movie-label'>Trailer URL:</label>
              <input className='edit-movie-input' type='text' value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)} />
      
              <label className='edit-movie-label'>Rating:</label>
              <input className='edit-movie-input' type='number' value={rating} onChange={(e) => setRating(e.target.value)} />
              <label className='edit-movie-label'>Genre:</label>
              <input
              className='edit-movie-input'
              type='text'
              value={genre}
              onChange={(e) => setGenre([e.target.value])}
              />
      
              <label className='edit-movie-label'>Status:</label>
              <select
                className='edit-movie-input'
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value=''>Select Status</option>
                <option value='now_playing'>Now Playing</option>
                <option value='coming_soon'>Coming Soon</option>
                <option value='archive'>Archive</option>
              </select>
      
              <button className='edit-movie-btn' type='submit'>
                Save Changes
              </button>
            </form>
          </>
        );
      };
      
      export default EditMovie;
      