import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList'; // Make sure to import MovieList component
import moviesData from './movies-2020s.json';

function App() {
  console.log(moviesData);
  return (
    <div>
      <NavBar movieData={moviesData} />
      <MovieList movieData={moviesData} />
    </div>
  );
}

export default App;