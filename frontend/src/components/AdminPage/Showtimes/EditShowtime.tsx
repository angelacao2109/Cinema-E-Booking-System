import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EditShowtime.css';

type Showtime = {
  id: string;
  movieId: string;
  time: string;
  theatreId: string;
};

type EditShowtimeFormProps = {
  onEditShowtime: (editedShowtime: Showtime) => void;
  fetchShowtimeById: (showtimeId: string) => Promise<Showtime | null>;
};

const EditShowtime: React.FC<EditShowtimeFormProps> = ({ onEditShowtime, fetchShowtimeById }) => {
  const { id } = useParams<{ id: string }>();
  const [editedShowtime, setEditedShowtime] = useState<Showtime | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const showtimeData = await fetchShowtimeById('');
      setEditedShowtime(showtimeData);
    };

    fetchData();
  }, [id, fetchShowtimeById]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedShowtime) {
      //setEditedShowtime((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedShowtime) return;

    if (editedShowtime.movieId.trim() === '' || editedShowtime.time.trim() === '' || editedShowtime.theatreId.trim() === '') {
      alert('Please enter Movie ID, Showtime, and Theatre ID.');
      return;
    }
    onEditShowtime(editedShowtime);
    // Add logic to update the showtime in the database 
  };

  if (!editedShowtime) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='edit-showtime-exit-link-container'>
        <Link to='/admin/showtime' className='edit-showtime-exit-link-styles'>
          Exit Edit Showtime Page
        </Link>
      </div>
      <div className='edit-showtime-container'>
        <div className='edit-showtime-header'>Edit Movie Showtime</div>
        <form className='edit-showtime-form' onSubmit={handleSubmit}>
          <label className='edit-showtime-label' htmlFor='movieId'>
            Movie ID:
          </label>
          <input
            className='edit-showtime-input'
            type='text'
            id='movieId'
            name='movieId'
            value={editedShowtime.movieId}
            onChange={handleInputChange}
            required
          />

          <label className='edit-showtime-label' htmlFor='time'>
            Showtime:
          </label>
          <input
            className='edit-showtime-input'
            type='text'
            id='time'
            name='time'
            value={editedShowtime.time}
            onChange={handleInputChange}
            required
          />

<label className='edit-showtime-label' htmlFor='theatreId'>Theatre ID:</label>
          <input
            className='edit-showtime-input'
            type='text'
            id='theatreId'
            name='theatreId'
            value={editedShowtime.theatreId}
            onChange={handleInputChange}
            required
          />

          <button className='edit-showtime-btn' type='submit'>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditShowtime;
