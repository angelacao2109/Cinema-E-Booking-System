import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditMovie.css';

// Define a type for the movie object
type Movie = {
  id: string;
  title: string;
  category: string;
  cast: string[];
  director: string;
  producer: string;
  synopsis: string;
  reviews: string[];
  rating: string;
  trailerVideoUrl: string;
  trailerPictureUrl: string;
  releaseDate: string;
  movieStatus: 'CURRENTLY_SHOWING' | 'COMING_SOON' | 'NOT_SHOWING';
};

const authToken = document.cookie
.split("; ")
.find((row) => row.startsWith("authToken="))
?.split("=")[1];

// Define a type for the props
type EditMovieProps = {
    onEditMovie: (movie: Movie) => void;
};

const EditMovie: React.FC<EditMovieProps> = ({ onEditMovie }) => {
    const [movie, setMovie] = useState<Movie>({
        id: '',
        title: '',
        category: '',
        cast: [],
        director: '',
        producer: '',
        synopsis: '',
        reviews: [],
        rating: '',
        trailerVideoUrl: '',
        trailerPictureUrl: '',
        releaseDate: '',
        status: 'CURRENTLY_SHOWING',
    });

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchMovie = async () => {
          // GET MOVIE BY ID NEEDS TO BE IMPLEMENTED
          try {
            const response = await axios.get(`http://localhost:8080/api/movie?id=${id}`, {headers: {Authorization: authToken}});
            setMovie(response.data);
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };

        fetchMovie();
    }, [id]);


    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // EDIT MOVIE BY ID NEEDS TO BE IMPLEMENTED
        try {
            const response = await axios.put(`http://localhost:8080/api/movie/${id}`, movie, {headers: {Authorization: authToken}});
            if (response.data) {
                onEditMovie(response.data);
                navigate('/admin/moviespage');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/movie/${id}`, {headers: {Authorization: authToken}});
            navigate('/admin/moviespage');
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    return (
        <>
            <div className='edit-movie-exit-link-container'>
                {/* Changed the link to navigate back to /admin/moviespage */}
                <Link to='/admin/moviespage' className='edit-movie-exit-link-styles'>Exit Edit Movie Page</Link>
            </div>

            {/* Created new div */}
            <div className='edit-movie-container'>

                <div className='edit-movie-header'>Edit Movie</div>

                <form className='edit-movie-form' onSubmit={handleEdit}>
                    {/* Title */}
                    <label className='edit-movie-label'>Title:</label>
                    <input type='text' name='title' value={movie.title} onChange={handleChange} />

                    {/* Director */}
                    <label className='edit-movie-label'>Director:</label>
                    <input type='text' name='director' value={movie.director} onChange={handleChange} />

                    {/* Producer */}
                    <label className='edit-movie-label'>Producer:</label>
                    <input type='text' name='producer' value={movie.producer} onChange={handleChange} />

                    {/* Synopsis */}
                    <label className='edit-movie-label'>Synopsis:</label>
                    <textarea name='synopsis' value={movie.synopsis} onChange={handleChange} />

                    {/* Movie Poster URL */}
                    <label className='edit-movie-label'>Movie Poster URL:</label>
                    <input type='text' name='trailerPictureUrl' value={movie.trailerPictureUrl} onChange={handleChange} />

                    {/* Trailer URL */}
                    <label className='edit-movie-label'>Trailer URL:</label>
                    <input type='text' name='trailerVideoUrl' value={movie.trailerVideoUrl} onChange={handleChange} />

                    {/* Rating */}
                    <label className='edit-movie-label'>Rating:</label>
                    <input type='text' name='rating' value={movie.rating} onChange={handleChange} />

                    {/* Status */}
                    <label className='edit-movie-label'>Status:</label>
                    <select name='movieStatus' value={movie.movieStatus} onChange={handleChange}>
                        <option value='CURRENTLY_SHOWING'>Currently Showing</option>
                        <option value='COMING_SOON'>Coming Soon</option>
                        <option value='NOT_SHOWING'>Not Showing</option>
                    </select>

                    <label className='edit-movie-label'>Release Date</label>
                    <input type='date' name='releaseDate' value={movie.releaseDate} onChange={handleChange}/>

                    {/* Created a div container for buttons */}
                    <div className='edit-movie-button-container'>
                        <button className='edit-movie-btn' type='submit'>Save Changes</button>
                        
                    </div>
                </form>
            </div>

        </>
    );
};

export default EditMovie;