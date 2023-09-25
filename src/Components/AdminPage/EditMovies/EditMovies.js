import React from 'react';
import './EditMovies.css';
import Popup from 'reactjs-popup';

function EditMovies (){
    return (
        <div>
            <h1>MANAGE MOVIES</h1>
            <div className='header'>
                <div>0000 Movies</div>
                <div>Archive</div>
                <div>Sort By</div>
            </div>
            <hr/>
            <div className='poster'>
                <div className='content'>
                    <div>
                        IMAGE
                    </div>
                    <div>
                        MOVIE TITLE
                    </div>
                    <div>
                        DATE
                    </div>
                    <div>
                    <Popup trigger=
                    {<button className='btn'>EDIT</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                    <h2>Edit Movies</h2>
                                    <div>
                                        <label>Movie Poster:</label>
                                        <input type="file"></input>
                                    </div>
                                    <div>
                                        <label>Movie Trailer</label>
                                    </div>
                                    <div>
                                        <label>Movie Title:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Description:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Rating:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Category:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Director(s):</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Producer(s):</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Cast:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Rating:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Synopsis:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Reviews:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Show Time:</label>
                                        <input type="time"></input>
                                    </div>
                                    <div>
                                        <label>Show Date:</label>
                                        <input type="date"></input>
                                    </div>
                                </div>
                                <br/>
                                <div>
                                    <button>Update</button>
                                    <button>Archive</button>
                                    <button onClick=
                                        {() => close()}>
                                            Exit
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Popup>

                    </div>
                </div>
            </div>
            
            <div className='poster'>
                <div className='content'>
                <Popup trigger=
                    {<button className='add_btn'>Add Movie</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                    <h2>Add Movies</h2>
                                    <div>
                                        <label>Movie Poster:</label>
                                        <input type="file"></input>
                                    </div>
                                    <div>
                                        <label>Movie Trailer</label>
                                    </div>
                                    <div>
                                        <label>Movie Title:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Description:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Rating:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Category:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Director(s):</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Producer(s):</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Cast:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Rating:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Synopsis:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Movie Reviews:</label>
                                        <input></input>
                                    </div>
                                    <div>
                                        <label>Show Time:</label>
                                        <input type="time"></input>
                                    </div>
                                    <div>
                                        <label>Show Date:</label>
                                        <input type="date"></input>
                                    </div>
                                </div>
                                <br/>
                                <div>
                                    <button>Save</button>
                                    <button onClick=
                                        {() => close()}>
                                            Exit
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Popup>

                </div>
            </div>
          
        </div>
    );
}

export default EditMovies;