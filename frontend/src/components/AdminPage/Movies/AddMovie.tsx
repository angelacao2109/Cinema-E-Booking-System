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
                navigate('/moviespage'); // Navigate to the movies page upon successful addition
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error("There was an error adding the movie", error);
        }
    };

    return (
        <>
            <div className='link-container'>
                <Link to='/moviespage' className='link-styles'>
                    Exit Add Movie Page
                </Link>
            </div>

            <div className='add-movie-header'>Add New Movie</div>
            <form className='add-movie-form' onSubmit={handleSubmit}>
                {/* Add your form fields here */}
                {/* Example: */}
                <label className='add-movie-label'>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={movieForm.title} 
                    onChange={handleInputChange} 
                />
                {/* Add other fields similarly */}
                <button className='add-movie-btn' type="submit">Add Movie</button>
            </form>
        </>
    );
};

export default AddMovie;
