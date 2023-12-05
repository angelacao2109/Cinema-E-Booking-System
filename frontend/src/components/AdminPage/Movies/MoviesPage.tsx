import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesPage.css';


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
    status: 'CURRENTLY_SHOWING' | 'COMING_SOON' | 'NOT_SHOWING';
};

const MoviesPage: React.FC = () => {
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const searchMovies = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/movie/search?title=${query}`);
            const data = await response.json();
            setFilteredMovies(data);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    useEffect(() => {
     
        if (searchQuery) {
            searchMovies(searchQuery);
        }
    }, [searchQuery]);

    const handleSearch = () => {
        searchMovies(searchQuery);
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setFilteredMovies([]);
    };

    return (
        <>
            <div className='movie-header'>
                MANAGE MOVIES
           
                <Link to="/admin/addmovie">
                    <button className='add-movie-button'>Add Movie</button>
                </Link>
            </div>

            <div className='search-tools'>
               
                    <input
                        className='search-input'
                        type='text'
                        placeholder='Search Movies...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className='search-button' onClick={handleSearch}>Search</button>
                    <button className='clear-button' onClick={handleResetSearch}>Clear</button>
            </div>

            <div className='movie-container'>
                {filteredMovies.map((movie) => (
                    <div key={movie.id} className='movie-card'>
                        <Link to={`/admin/movieinfo/${movie.id}`}>
                            <img src={movie.trailerPictureUrl} alt={`${movie.title} Poster`} />
                        </Link>
                        <div className='movie-content'>
                            <h3>{movie.title}</h3>
                            <p><strong>Director:</strong> {movie.director}</p>
                            <p><strong>Rating:</strong> {movie.rating}</p>
                            <Link to={`/admin/editmovie/${movie.id}`} className="edit-link">Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MoviesPage;