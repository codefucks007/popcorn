import React from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const favoriteStatus =
    typeof isFavorite === "function" ? isFavorite(movie.id) : isFavorite;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="card-link">
      <div className="card">
        {movie.poster_path ? (
          <img src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}

        <div className="card-info">
          <h4>{movie.title}</h4>
          <div className="card-bottom">
            <span className="rating">
              <FaStar color="gold" />{" "}
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0"}
            </span>
            <button className="fav-btn-card" onClick={handleFavoriteClick}>
              {favoriteStatus ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
