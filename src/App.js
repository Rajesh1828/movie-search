import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=37fdaadf`)
      .then(response => response.json())
      .then(value => {
        if (value.Response === "False") {
          setData([]); // Reset data if no movie is found
          setErrorMessage("Sorry, movie not in my history. Update coming soon!");
        } else {
          setData(value.Search || []); // Set data if movies are found
          setErrorMessage(""); 
        }
      });
  };

  return (
    <div className="app-container">
      <center>
        <h2>Movie Search APP to View on IMDb</h2>
        <form onSubmit={submitHandler} className="search-form">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie..."
            className="search-input"
          />
          <input type="submit" value="Submit" className="search-button" />
        </form>

        {/* Display error message if no movies are found */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Display movie cards */}
        <div className="card-container">
          {data.map(movie => (
            <div key={movie.imdbID} className="card">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <a href={`https://www.imdb.com/title/${movie.imdbID}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  View on IMDb
                </a>
              </div>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};

export default App;
