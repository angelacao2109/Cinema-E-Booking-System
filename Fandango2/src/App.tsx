import { useState } from 'react'

import './App.css'
import MovieList from './components/MovieList/MovieList';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import moviesData from './movies-2020s.json';


function App() {
  return (
    <div>
     
     <NavBar movieData={moviesData} />
     
    </div>
  );
}

export default App;