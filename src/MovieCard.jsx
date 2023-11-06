import React from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className="movie-card" key={imdbID}>
      {/* Movie details section */}
      <div className="movie-card-details">
        <h2 className="movie-title">{Title}</h2> {/* Movie title */}
        <p className="movie-type">{Type}</p> {/* Movie type (e.g., Drama, Action) */}
        <p className="movie-year">{Year}</p> {/* Movie release year */}
      </div>

      {/* Movie poster section */}
      <div className="movie-card-image">
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
          className="movie-poster"
        /> {/* Movie poster image */}
      </div>
    </div>
  );
}

export default MovieCard;
