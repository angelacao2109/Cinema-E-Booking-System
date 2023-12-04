import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddMovie.css';
import axios from 'axios'; 

// Define a type for the movie object
type Movie = {
    trailerPictureUrl: string;
    trailerVideoUrl: string;
    title: string;
    rating: string;
    category: string;
    director: string;
    producer: string;
    cast: string;
    synopsis: string;
    reviews: string[];
    // Add other properties if needed
};

type AddMovieProps = {
    onAddMovie: (movie: Movie) => void;
};

const AddMovie: React.FC<AddMovieProps> = ({ onAddMovie }) => {
    const [movieForm, setMovieForm] = useState<Movie>({
        trailerPictureUrl: "",
        trailerVideoUrl: "",
        title: "",
        rating: "",
        category: "",
        director: "",
        producer: "",
        cast: "",
        synopsis: "",
        reviews: [""]
    });

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMovieForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/movie/add", movieForm);
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
                <div className='add-movie-header'>Add New Movie</div>

                <form className='add-movie-form' onSubmit={handleSubmit}>
                    <label className='add-movie-label'>Title:</label>
                    <input type='text' name='title' value={movieForm.title} onChange={handleInputChange} />

                    <label className='add-movie-label'>Director:</label>
                    <input type='text' name='director' value={movieForm.director} onChange={handleInputChange} />

                    <label className='add-movie-label'>Producer:</label>
                    <input type='text' name='producer' value={movieForm.producer} onChange={handleInputChange} />
                    
                    {/*
                    WAS GIVING ME SOME ISSUES 
                    <label className='edit-movie-label'>Synopsis:</label>
                    <textarea name='synopsis' value={movieForm.synopsis[0]} onChange={handleSynopsisChange} />
                     */}

                    <label className='add-movie-label'>Movie Poster URL:</label>
                    <input
                        type='text'
                        name='trailerPictureUrl'
                        value={movieForm.trailerPictureUrl}
                        onChange={handleInputChange}
                    />

                    <label className='add-movie-label'>Trailer URL:</label>
                    <input
                        type='text'
                        name='trailerVideoUrl'
                        value={movieForm.trailerVideoUrl}
                        onChange={handleInputChange}
                    />

                    <label className='add-movie-label'>Rating:</label>
                    <input type='text' name='rating' value={movieForm.rating} onChange={handleInputChange} />

                    <label className='add-movie-label'>Category:</label>
                    <input type='text' name='category' value={movieForm.category} onChange={handleInputChange} />

                    {/* Created a div container for add movie btn */}

                    <div className='add-movie-button-container'>
                        <button className='edit-movie-btn' type='submit'>
                            Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMovie;
