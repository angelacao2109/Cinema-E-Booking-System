import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Movie} from "../types";


type SearchBarProps = {
  placeholder: string;
};

function SearchBar({
  placeholder,
  searchQuery,
  onSearchChange,
  onSearchResultsChange,
}: SearchBarProps & {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchResultsChange: (results: Movie[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const timerId = setTimeout(async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/movie/search",
            {
              params: { title: searchQuery },
            }
          );
          onSearchResultsChange(response.data);
          setFilteredData(response.data); // Store the movie results
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies"); // Set an error message
        }
      }, 500);

      return () => clearTimeout(timerId);
    } else {
      onSearchResultsChange([]);
    }
  }, [searchQuery]);


  return (
    <div className="searchbar">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
              <img
                src={movie.trailerPictureUrl}
                alt={`${movie.title} poster`}
                className="movieThumbnail"
              />
              <div className="movieDetails">
                <h4>{movie.title}</h4>
   {/* <p>{movie.extract}</p> */}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
