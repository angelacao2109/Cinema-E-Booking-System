import React, { useState, useEffect } from "react";
import "./MovieList.css";
import SeatSelection from "../SeatSelection/SeatSelection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Embed from "react-embed";

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
  showtimes?: Showtime[];
};

type Showtime = {
  id: number;
  startTime: string;

};

type MovieListProps = {
  searchResults: Movie[];
};

const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

const MovieList: React.FC<MovieListProps> = ({ searchResults }) => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState<Movie[]>([]);

  
  const handleShowtimeSelect = (showtimeID: number) => {
    navigate("/select-ticket", { state: { showtimeID: showtimeID } });
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios({method:"get",url:"http://localhost:8080/api/movie/homepage",
        headers: {
          'Authorization': authToken,
        },
      });

       const fetchedMovies = response.data;
        setComingSoonMovies(response.data.comingSoon);
        setCurrentlyShowingMovies(response.data.currentlyShowing);

        const moviesWithShowtimes = await Promise.all(
          fetchedMovies.map(async (movie: Movie) => {
            try {
              const showtimeResponse = await axios.get(`http://localhost:8080/api/showtimes/movie?movieID=${movie.id}`);
              return { ...movie, showtimes: showtimeResponse.data.showtimes };
            } catch (showtimeError) {
              console.error(`Error fetching showtimes for movie ID ${movie.id}:`, showtimeError);
              return { ...movie, showtimes: [] };
            }
          })
        );
        setMovieData(moviesWithShowtimes);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const moviesToShow = searchResults.length > 0 ? searchResults : movieData;


  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie, index) => (
      <div key={index} className="movie-item">
        <div className="movie-poster-wrapper">
          <img className="list-movie-poster" src={movie.trailerPictureUrl} alt={movie.title}  />
        </div>
        <div className="movie-details">
          
          <h3>{movie.title}</h3>
          <p>
            <strong>Category:</strong> {movie.category}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Producer:</strong> {movie.producer}
          </p>
          <p>
            <strong>Synopsis:</strong> {movie.synopsis}
          </p>
          <p>
            <strong>Reviews:</strong> {movie.reviews.join(", ")}
          </p>
          <p>
            <strong>MPAA Rating:</strong> {movie.rating}
          </p>
          </div>
          <div className="embedded-videos">
            <iframe
              width="200"
              height="100"
              src={movie.trailerVideoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
        </div>
        ));
  };

  
    return (
        <div className="movie-list">
          {/* 
          Removed Heading 
          Hopefully the 'Movies Now Playing' and 'Movies Coming Soon' will show their respected movies
          <h2 style={{ color: "#CF291D" }}>Currently Showing Movies</h2>
          */}

          <h2 style={{ color: "#CF291D", textAlign: "left" }}>Movies</h2>

          <div className="movies-grid">
            {renderMovies(currentlyShowingMovies)}
          </div>

          {/*
          Removed Heading 
          <h2 style={{ color: "#CF291D" }}>Coming Soon Movies</h2>
          */}

          <div className="movies-grid">
            {renderMovies(comingSoonMovies)}
          </div>
        </div>
        );
};
export default MovieList;
