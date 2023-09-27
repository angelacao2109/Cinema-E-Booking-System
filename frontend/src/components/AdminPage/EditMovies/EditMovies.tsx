import React, { ReactNode, useState } from 'react';
import axios from 'axios'; 
import './EditMovies.css';

const EditMovies: React.FC = () => {
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

  return (
    <div>
      <h1>MANAGE MOVIES</h1>
      <div className='header'>
        <div>0000 Movies</div>
        <div>Archive</div>
        <div>Sort By</div>
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
              <button>Save</button>
              <button onClick={handleClose}>Exit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMovies;
