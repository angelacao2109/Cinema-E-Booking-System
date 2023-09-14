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

    useEffect(() => {
        if (inputValue) {
            const timerId = setTimeout(async () => {
                try {
                    const response = await axios.get('/api/movies/search', { 
                        params: { query: inputValue } 
                    });
                    setFilteredData(response.data);
                } catch (error) {
                    console.error('Error fetching movies:', error);
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
                    />
                    <div className="searchIcon">
                        <SearchIcon /> 
                    </div>
                </div>
                {filteredData.length > 0 && (
                    <>
                      {filteredData.map((movie, key) => (
                        <div key={key} className="movieResult">
                            <img src={movie.thumbnail} alt={`${movie.title} poster`} className="movieThumbnail"/>
                            <div className="movieDetails">
                                <h4>{movie.title}</h4>
                                <p>{movie.extract}</p>
                                {/* Add more details as needed */}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
                    

export default SearchBar;