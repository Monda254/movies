import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard"; // Component import
import "./APP.css"; // Styles import
import SearchIcon from "./search.svg"; // Search icon import

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a"; // API URL

const App = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // State for input field value
  const [movies, setMovies] = useState([]); // State for the list of movies
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error message

  useEffect(() => {
    // useEffect hook to fetch movies on initial load
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    setIsLoading(true); // Show loading indicator

    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.Search); // Update the movie list
    } catch (error) {
      setError(error); // Handle and store any errors
    } finally {
      setIsLoading(false); // Hide loading indicator regardless of success or failure
    }
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  return (
   <div className="app">
        <h1 className="app-title">Monda Movie Yard</h1> {/* Component rendering (Title) */}

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Event handling (input field)
            placeholder="Search for movies" />
          <button className="search-button" onClick={handleSearch}>
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <img src={SearchIcon} alt="search" />
            )}
          </button>
        </div>

        {error ? (
          <div className="empty">
            <h2>An error occurred. Please try again later.</h2>
          </div>
        ) : movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} /> // Component rendering (MovieCard)
            ))}
          </div>
        ) : (
          <div className="empty">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <h2>No movies found</h2>
            )}
          </div>
        )}
      </div>
  );
};

export default App;
