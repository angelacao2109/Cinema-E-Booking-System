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

type Theatre = {
  id: number;
  number: number;
  numberOfSeats: number;
  numRows: number;
  numCols: number;
}

type Showtime = {
  id: number;
  dateTime: string;
  bookings: string;
  theatre: Theatre[];
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
    const fetchShowtimes = async (fetchedMovies: Movie[]) => {
      return Promise.all(fetchedMovies.map(async (movie) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/showtime/movie?movieID=${movie.id}`, { headers: { 'Authorization': authToken } });
          if (response.status === 200) {
            return {
              ...movie,
              showtimes: response.data.showtimes,
            };
          }
        } catch (error) {
          console.log("Error fetching showtimes:", error);
        }
        return movie;
      }));
    };

    const fetchMovies = async () => {
      try {
        const response = await axios({
          method: "get", url: "http://localhost:8080/api/movie/homepage",
          headers: { 'Authorization': authToken },
        });

        const comingSoonWithShowtimes = await fetchShowtimes(response.data.comingSoon);
        const currentlyShowingWithShowtimes = await fetchShowtimes(response.data.currentlyShowing);

        setComingSoonMovies(comingSoonWithShowtimes);
        setCurrentlyShowingMovies(currentlyShowingWithShowtimes);

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
          <img className="list-movie-poster" src={movie.trailerPictureUrl} alt={movie.title} />
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
        <p>
      <strong>Showtimes:</strong>
    </p>
    {movie.showtimes && movie.showtimes.length > 0 ? (
      movie.showtimes.map((showtime) => (
        <button key={showtime.id} onClick={() => navigate(`/select-ticket/${showtime.id}`)} className="showtime-button">
          {new Date(Date.parse(showtime.dateTime)).toLocaleString()}
        </button>
      ))
    ) : (
      <p>No showtimes available</p>
    )}
        <div className="embedded-videos">
          <iframe
            width="200"
            height="100"
            src={movie.trailerVideoUrl}
            allowFullScreen
          />
        </div>

      </div>
    ));
  };

  return (
    <div className="movie-list">


      <h2 style={{ color: "#CF291D" }}>Currently Showing Movies</h2>

      <div className="movies-grid">
        {renderMovies(currentlyShowingMovies)}
      </div>

      <h2 style={{ color: "#CF291D" }}>Coming Soon Movies</h2>

      <div className="movies-grid">
        {renderMovies(comingSoonMovies)}
      </div>
    </div>
  );
};
export default MovieList;
