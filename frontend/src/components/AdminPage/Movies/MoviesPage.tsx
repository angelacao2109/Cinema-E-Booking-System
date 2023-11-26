import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesPage.css';

// Define a type for the movie object
type Movie = {
    id: string;
    _id: string; // Assuming you have both id and _id
    title: string;
    director: string[];
    producer?: string[]; // Add other fields as needed
    cast?: string[];
    synopsis?: string;
    reviews?: string;
    moviePoster: string;
    trailerUrl?: string;
    rating: string;
    genre?: string[];
    releaseYear?: string;
    status: 'now_playing' | 'coming_soon' | 'archive';
};

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [isNowPlayingClicked, setIsNowPlayingClicked] = useState<boolean>(false);
    const [isComingSoonClicked, setIsComingSoonClicked] = useState<boolean>(false);
    const [isArchiveClicked, setIsArchiveClicked] = useState<boolean>(false);
    const [isAllClicked, setIsAllClicked] = useState<boolean>(false);

    const fetchMovies = async () => {
        try {
        const response = await fetch('http://localhost:5173/api/movie/');
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
        } catch (error) {
        console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSearch = () => {
        const filteredMovies = movies.filter(
        (movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredMovies(filteredMovies);
        applyFilter(selectedFilter, filteredMovies);
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setFilteredMovies(movies);
        applyFilter(selectedFilter, movies);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        applyFilter(event.target.value, movies);
        setIsNowPlayingClicked(false);
        setIsComingSoonClicked(false);
        setIsArchiveClicked(false);
        setIsAllClicked(false);
    };

    const applyFilter = (filter, data) => {
        switch (filter) {
        case 'now_playing':
        case 'coming_soon':
        case 'archive':
            setFilteredMovies(data.filter((movie) => movie.status === filter));
            setIsNowPlayingClicked(filter === 'now_playing');
            setIsComingSoonClicked(filter === 'coming_soon');
            setIsArchiveClicked(filter === 'archive');
            setIsAllClicked(false);
            break;
        case 'title_alphabetical':
            setFilteredMovies([...data].sort((a, b) => a.title.localeCompare(b.title)));
            setIsAllClicked(false);
            break;
        case 'genre':
            setFilteredMovies([...data].sort((a, b) => a.genre.localeCompare(b.genre)));
            setIsAllClicked(false);
            break;
        case 'rating':
            setFilteredMovies([...data].sort((a, b) => b.rating - a.rating));
            setIsAllClicked(false);
            break;
        case 'all':
            setFilteredMovies(data);
            setIsNowPlayingClicked(false);
            setIsComingSoonClicked(false);
            setIsArchiveClicked(false);
        
            break;
        default:
            setFilteredMovies(data);
            setIsNowPlayingClicked(false);
            setIsComingSoonClicked(false);
            setIsArchiveClicked(false);
            setIsAllClicked(false);
            break;
        }
    };

    return (
        <>
        <div className='movie-header'>
            MANAGE MOVIES
            <Link to="/addmovie">
            <button className='add-movie-button'>Add Movie</button>
            </Link>
        </div>

        <div className='search-tools'>
        <div className='search-container'>
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

        <div className='movie-status'>
            <button className='filter-button' onClick={() => applyFilter('now_playing', movies)}>Now Playing</button>
            <button className='filter-button' onClick={() => applyFilter('coming_soon', movies)}>Coming Soon</button>
            <button className='filter-button' onClick={() => applyFilter('archive', movies)}>Archived</button>
            <button className='filter-button' onClick={() => applyFilter('all', movies)}>All</button>
        </div>
    
            {/*
        <select className='filter-select' value={selectedFilter} onChange={handleFilterChange}>
            <option value='all'>All</option>
            <option value='now_playing'>Now Playing</option>
            <option value='coming_soon'>Coming Soon</option>
            <option value='archive'>Archived</option>
            <option value='title_alphabetical'>Title (Alphabetical)</option>
            <option value='genre'>Genre</option>
            <option value='rating'>Rating</option>
            </select>
            */}
        </div>

        <div> 
            {isNowPlayingClicked ? (
                <div>
                <div className='now-playing-header'>Now Playing:</div>
                    <ul className='movie-container'>
                    {filteredMovies
                        .filter((movie) => movie.status === 'now_playing')
                        .map((movie) => (
                        <li key={movie.id} className='movie-card'>
                            <Link to={`/movieinfo/${movie._id}`}><img src={movie.moviePoster} alt={`${movie.title} Poster`} /></Link>
                            <div className='movie-content'>
                            <h3>{movie.title}</h3>
                            <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                            <p><strong>Rating:</strong> {movie.rating}</p>
                            <Link to={`/editmovie/${movie._id}`} className="edit-link">Edit</Link>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {isComingSoonClicked ? (
            <div>
                <div className='coming-soon-header'>Coming Soon:</div>
                <ul className='movie-container'>
                    {filteredMovies
                    .filter((movie) => movie.status === 'coming_soon')
                    .map((movie) => (
                        <li key={movie.id} className='movie-card'>
                            <Link to={`/movieinfo/${movie._id}`}><img src={movie.moviePoster} alt={`${movie.title} Poster`} /></Link>
                            <div className='movie-content'>
                                <h3>{movie.title}</h3>
                                <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                                <p><strong>Rating:</strong> {movie.rating}</p>
                                <Link to={`/editmovie/${movie._id}`} className="edit-link">Edit</Link>
                        </div>
                        </li>
                    ))}
                </ul>
            </div>
            ) : null}

            {isArchiveClicked ? (
                <div> 
            <div className='archived-header'>Archived:</div>
            <ul className='movie-container'>
            {filteredMovies
                .filter((movie) => movie.status === 'archive')
                .map((movie) => (
                <li key={movie.id} className='movie-card'>
                    <Link to={`/movieinfo/${movie._id}`}><img src={movie.moviePoster} alt={`${movie.title} Poster`} /></Link>
                    <div className='movie-content'>
                    <h3>{movie.title}</h3>
                    <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <Link to={`/editmovie/${movie._id}`} className="edit-link">Edit</Link>
                    </div>
                </li>
                ))}
            </ul>
            </div>
            ) : null}

            {isAllClicked && (
            <div>
                <div className='all-movies-header'>All Movies:</div>
                <ul className='movie-container'>
                {filteredMovies.map((movie) => (
                    <li key={movie.id} className='movie-card'>
                    <Link to={`/movieinfo/${movie._id}`}><img src={movie.moviePoster} alt={`${movie.title} Poster`} /></Link>
                    <div className='movie-content'>
                        <h3>{movie.title}</h3>
                        <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <Link to={`/editmovie/${movie._id}`} className="edit-link">Edit</Link>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {!isNowPlayingClicked && !isComingSoonClicked && !isArchiveClicked && !isAllClicked ?  (
            <div>
                <div className='all-movies-header'>All Movies:</div>
                <ul className='movie-container'>
                    {filteredMovies.map((movie) => (
                    <li key={movie.id} className='movie-card'>
                        <Link to={`/movieinfo/${movie._id}`}><img src={movie.moviePoster} alt={`${movie.title} Poster`} /></Link>
                            <div className='movie-content'>
                            <h3>{movie.title}</h3>
                            <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                            <Link to={`/editmovie/${movie._id}`} className="edit-link">Edit</Link>
                            </div>
                    </li>
                    ))}
                </ul>
            </div>
            ) : null}
        </div>
        </>
    );
};

export default MoviesPage;