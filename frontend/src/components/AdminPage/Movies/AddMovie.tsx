import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddMovie.css';
import axios from 'axios'; 

// Define a type for the movie object
type Movie = {
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
type AddMovieProps = {
    onAddMovie: (movie: Movie) => void;
};

const authToken = document.cookie
.split("; ")
.find((row) => row.startsWith("authToken="))
?.split("=")[1];

const AddMovie: React.FC<AddMovieProps> = ({ onAddMovie }) => {
    const [movie, setMovie] = useState<Movie>({
        trailerPictureUrl: "",
        trailerVideoUrl: "",
        title: "",
        rating: "",
        category: "",
        director: "",
        producer: "",
        cast: "",
        synopsis: "",
        reviews: [""],
    });

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMovie(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/movie",movie,{headers: {Authorization: authToken}});
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                navigate('/admin/moviespage');  // Navigate to the movies page upon successful addition
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error("There was an error adding the movie", error);
        }
    };

    return (
        <>

        {/* Created form for add movies */}

            <div className='add-movie-exit-link-container'>
                <Link to='/admin/moviespage' className='add-movie-exit-link-styles'>
                    Exit Add Movie Page
                </Link>
            </div>

            <div className='add-movie-container'>

                <div className='add-movie-header'>Add Movie</div>

                <form className='add-movie-form' onSubmit={handleSubmit}>
                    {/* Title */}
                    <label className='add-movie-label'>Title:</label>
                    <input type='text' name='title' value={movie.title} onChange={handleChange} />

                    {/* Director */}
                    <label className='add-movie-label'>Director:</label>
                    <input type='text' name='director' value={movie.director} onChange={handleChange} />

                    {/* Producer */}
                    <label className='add-movie-label'>Producer:</label>
                    <input type='text' name='producer' value={movie.producer} onChange={handleChange} />

                    {/* Category */}
                    <label className='add-movie-label'> Category:</label>
                    <input type='text' name='category' value={movie.category} onChange={handleChange} />

                    {/* Synopsis */}
                    <label className='add-movie-label'>Synopsis:</label>
                    <textarea name='synopsis' value={movie.synopsis} onChange={handleChange} />

                    {/* Movie Poster URL */}
                    <label className='add-movie-label'>Movie Poster URL:</label>
                    <input type='text' name='trailerPictureUrl' value={movie.trailerPictureUrl} onChange={handleChange} />

                    {/* Trailer URL */}
                    <label className='add-movie-label'>Trailer URL:</label>
                    <input type='text' name='trailerVideoUrl' value={movie.trailerVideoUrl} onChange={handleChange} />

                    {/* Rating */}
                    <label className='add-movie-label'>Rating:</label>
                    <input type='text' name='rating' value={movie.rating} onChange={handleChange} />

                    {/* Status */}
                    <label className='add-movie-label'>Status:</label>
                    <select name='movieStatus' value={movie.movieStatus} onChange={handleChange}>
                        <option value='CURRENTLY_SHOWING'>Currently Showing</option>
                        <option value='COMING_SOON'>Coming Soon</option>
                        <option value='NOT_SHOWING'>Not Showing</option>
                    </select>

                    <label className='add-movie-label'>Release Date</label>
                    <input type='date' name='releaseDate' value={movie.releaseDate} onChange={handleChange}/>

                    {/* Created a div container for buttons */}
                    <div className='add-movie-button-container'>
                        <button className='add-movie-btn' type='submit'>Save Changes</button>
                        
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMovie;
