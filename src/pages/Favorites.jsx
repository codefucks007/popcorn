import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { FaHeartBroken } from "react-icons/fa";

const Favorites = ({ favorites, toggleFavorite, darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favCount={favorites.length}
      />

      <div className="container">
        <h2 className="page-title">My Favorites ({favorites.length})</h2>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <FaHeartBroken size={50} color="#777" />
            <p>No favorites yet.</p>
            <p className="sub-text">
              Go back to Home and click the heart ❤️ to add movies.
            </p>
          </div>
        ) : (
          <div className="grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
