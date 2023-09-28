import React, { ReactNode, useState } from 'react';
import axios from 'axios'; 
import './EditMovies.css';



const EditMovies: React.FC = () => {
  const [movieForm, setMovieForm] = useState({
    trailerPictureUrl: "",
    trailerVideoUrl: "",
    title: "",
    rating: "",
    category: "",
    director: "",
    producer: "",
    cast: "",
    synopsis: "",
    reviews: [""]
    //showTime: "",
    //showDate: ""
  });
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleClose = () => {
    setEditing(false);
    setAdding(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovieForm(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const file = event.target.files![0]; // The "!" after "files" is a non-null assertion.
    setMovieForm(prevState => ({ ...prevState, [name]: file }));
  };
  
  const handleAddMovie = async () => {
    // Create a FormData instance
    const formData = new FormData();
    
    for (let key in movieForm) {
      formData.append(key, movieForm[key]);
    }
  
    try {
      
      const response = await axios.post("http://localhost:8080/api/movie/add", 
      {
        trailerPictureUrl: movieForm['trailerPictureUrl'],
        trailerVideoUrl: movieForm['trailerVideoUrl'],
        title: movieForm['title'],
        rating: movieForm['rating'],
        category: movieForm['category'],
        director: movieForm['director'],
        producer: movieForm['producer'],
        cast: movieForm['cast'],
        synopsis: movieForm['synopsis'],
        reviews: [""]
      });
      console.log(response.data);
      // Close the adding modal after successful addition
      setAdding(false);
    } catch (error) {
      console.error("There was an error adding the movie", error);
      console.log(JSON.stringify({
        trailerPictureUrl: movieForm['trailerPictureUrl'],
        trailerVideoUrl: movieForm['trailerVideoUrl'],
        title: movieForm['title'],
        rating: movieForm['rating'],
        category: movieForm['category'],
        director: movieForm['director'],
        producer: movieForm['producer'],
        cast: movieForm['cast'],
        synopsis: movieForm['synopsis'],
        reviews: [""]
      }))
    }
  };

  
  return (
    <div>
      <h1>MANAGE MOVIES</h1>
      <div className='header'>
      </div>
      <hr />
      <div className='poster'>
    <div className='content'>
        <div>IMAGE</div>
        <div>MOVIE TITLE</div>
        <div>DATE</div>
        <div>
            <button className='btn' onClick={handleEditClick}>
                EDIT
            </button>
        </div>
    </div>
</div>

      {editing && (
        <div className='custom-modal'>
          <div className='modal-content'>
            <h2>Edit Movies</h2>
            <div>
              <label>Movie Poster:</label>
              <input type="file" />
            </div>
            <div>
              <label>Movie Trailer:</label>
              <input />
            </div>
            <div>
              <label>Movie Title:</label>
              <input />
            </div>
            <div>
              <label>Movie Description:</label>
              <input />
            </div>
            <div>
              <label>Movie Rating:</label>
              <input />
            </div>
            <div>
              <label>Movie Category:</label>
              <input />
            </div>
            <div>
              <label>Movie Director(s):</label>
              <input />
            </div>
            <div>
              <label>Movie Producer(s):</label>
              <input />
            </div>
            <div>
              <label>Movie Cast:</label>
              <input />
            </div>
            <div>
              <label>Movie Synopsis:</label>
              <input />
            </div>
            <div>
              <label>Movie Reviews:</label>
              <input />
            </div>
            <div>
              <label>Show Time:</label>
              <input type="time" />
            </div>
            <div>
              <label>Show Date:</label>
              <input type="date" />
            </div>
            <div>
              <button>Update</button>
              <button>Archive</button>
              <button onClick={handleClose}>Exit</button>
            </div>
          </div>
        </div>
      )}

      <div className='poster'>
        <div className='content'>
          <button className='add_btn' onClick={handleAddClick}>
            Add Movie
          </button>
        </div>
      </div>

      {adding && (
        <div className='custom-modal'>
          <div className='modal-content'>
            <h2>Add Movies</h2>
            <div>
              <label>Movie Poster:</label>
              <input 
                 
                name="trailerPictureUrl" 
                value={movieForm.trailerPictureUrl} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Trailer:</label>
              <input 
                name="trailerVideoUrl" 
                value={movieForm.trailerVideoUrl} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Title:</label>
              <input 
                name="title" 
                value={movieForm.title} 
                onChange={handleInputChange} />
            </div>
           
            <div>
              <label>Movie Rating:</label>
              <input 
                name="rating" 
                value={movieForm.rating} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Category:</label>
              <input 
                name="category" 
                value={movieForm.category} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Director(s):</label>
              <input 
                name="director" 
                value={movieForm.director} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Producer(s):</label>
              <input 
                name="producer" 
                value={movieForm.producer} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Cast:</label>
              <input 
                name="cast" 
                value={movieForm.cast} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Synopsis:</label>
              <input 
                name="synopsis" 
                value={movieForm.synopsis} 
                onChange={handleInputChange} />
            </div>
            <div>
              <label>Movie Reviews:</label>
              <input 
                name="reviews" 
                value={movieForm.reviews} 
                onChange={handleInputChange} />
            </div>
            {/*
            <div>
              <label>Show Time:</label>
              <input type="time" />
            </div>
            <div>
              <label>Show Date:</label>
              <input type="date" />
            </div>
      */}
            <div>
            <button onClick={handleAddMovie}>Save</button>
              <button onClick={handleClose}>Exit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMovies;
