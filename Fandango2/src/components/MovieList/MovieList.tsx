import React from 'react';
import './MovieList.css';

const getRandomDate = (start = new Date(), end = new Date(new Date().setDate(new Date().getDate() + 14))) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const getMultipleShowtimesAndDates = (days: number = 3) => {
  const allShowDetails = [];

  for (let j = 0; j < days; j++) {
    const showtimes = [];
    for (let i = 0; i < 3; i++) {
      const hour = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
      const minutes = Math.floor(Math.random() * 2) === 0 ? "00" : "30";
      showtimes.push(`${hour}:${minutes}`);
    }

    const date = getRandomDate();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    allShowDetails.push({
      date: formattedDate,
      times: showtimes
    });
  }

  return allShowDetails;
}

type MovieProps = {
    movieData: any[];
};

const MovieList: React.FC<MovieProps> = ({ movieData }) => {
  return (
    <div className="movie-list">
      <h2>Available Movies</h2>
      <div className="movies-grid">
        {movieData.map((movie, index) => {
          console.log(movie.trailer); 
          const showDetails = getMultipleShowtimesAndDates();
          return (
            <div key={index} className="movie-item">
              <img src={movie.thumbnail} alt={`${movie.title} poster`} className="movie-poster"/>
              <h3>{movie.title}</h3>
              <p>{movie.genres.join(', ')}</p>
              <button onClick={() => {
    const win = window.open(movie.trailer, '_blank');
    if (win) {
        win.focus();
    }
}} className="showtime-btn">Watch Trailer</button>

              {showDetails.map((detail, detailIndex) => (
                <div key={detailIndex}>
                  <p>Show Date: {detail.date}</p>
                  {detail.times.map((time, timeIndex) => (
                    <button key={timeIndex} className="showtime-btn">{time}</button>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
