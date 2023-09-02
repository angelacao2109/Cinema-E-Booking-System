import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search'; 


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
    data: Movie[]; 
};

function SearchBar({ placeholder, data }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(''); 

    const filteredData = data.filter(movie => {
        const searchString = inputValue.toLowerCase();
        
        // Check if the search is specific to rating
        const isRatingSearch = searchString.startsWith('rating:');
        if (isRatingSearch) {
            const ratingSearchValue = parseFloat(searchString.split(':')[1]);
            return movie.rating === ratingSearchValue;
        }

        return (
            movie.title.toLowerCase().includes(searchString) || 
            movie.cast.some((castName: string) => castName.toLowerCase().includes(searchString)) || 
            movie.genres.some((genre: string) => genre.toLowerCase().includes(searchString)) ||
            (movie.rating && movie.rating.toString().includes(searchString))  // Checking rating normally
        );
    });

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
            {inputValue.length > 0 && (   // Start of conditional rendering
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