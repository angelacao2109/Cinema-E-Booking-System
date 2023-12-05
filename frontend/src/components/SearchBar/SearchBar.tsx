import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Movie } from "../types";

type SearchBarProps = {
  onSearchResultsChange: (results: Movie[]) => void;
};

function SearchBar({ onSearchResultsChange }: SearchBarProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [filteredData, setFilteredData] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movie/search", {
        params: { title, category, director },
      });
      setFilteredData(response.data); // Update the filtered data with the response
      onSearchResultsChange(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies"); 
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (title || category || director) {
        performSearch();
      } else {
        setFilteredData([]); 
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [title, category, director]);

  return (
    <div className="searchbar">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Search for movies by title"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Search for movies by category"
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          aria-label="Search for movies by director"
        />
        <div className="searchIcon">
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
      {error && <div className="errorMessage">{error}</div>}
      {filteredData.length > 0 && (
        <div className="movieResults">
          {filteredData.map((movie, key) => (
            <div key={key} className="movieResult">
              <img
                src={movie.trailerPictureUrl}
                alt={`${movie.title} poster`}
                className="movieThumbnail"
              />
              <div className="movieDetails">
                <h4>{movie.title}</h4>
          
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;