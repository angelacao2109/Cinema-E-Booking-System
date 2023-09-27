import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';


type Movie = {
    title: string;
    year: number;
    cast: string[];
    genres: string[];
    href: string;
    extract: string;
    thumbnail: string;
    thumbnail_width: number;
    thumbnail_height: number;
    rating?: number;  
};

type SearchBarProps = {
    placeholder: string;
  
};

function SearchBar({ placeholder }: SearchBarProps) {
    const [inputValue, setInputValue] = useState('');
    const [filteredData, setFilteredData] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (inputValue) {
            const timerId = setTimeout(async () => {
                try {
                    const response = await axios.get('/api/movies/search', { 
                        params: { query: inputValue } 
                    });
                    setFilteredData(response.data);
                    setError(null); 
                } catch (error) {
                    console.error('Error fetching movies:', error);
                    setError('There was an error fetching movie data.');
                }
            }, 500);
          
            return () => clearTimeout(timerId);
        } else {
            setFilteredData([]);
        }
    }, [inputValue]);
    
    return (
        <div className="searchbar">
            <div className="searchInputs"> 
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    aria-label="Search for movies"
                />
                <div className="searchIcon">
                    <SearchIcon aria-hidden="true" /> 
                </div>
            </div>
            {error && <div className="errorMessage">{error}</div>}
            {filteredData.length > 0 && (
                <div className="movieResults">
                    {filteredData.map((movie, key) => (
                        //would need to change later to find other movie results
                        <div key={movie.title} className="movieResult">  
                            <img src={movie.thumbnail} alt={`${movie.title} poster`} className="movieThumbnail"/>
                            <div className="movieDetails">
                                <h4>{movie.title}</h4>
                                <p>{movie.extract}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

                    

export default SearchBar;