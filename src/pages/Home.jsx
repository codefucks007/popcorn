import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { FaArrowLeft } from "react-icons/fa";

const Home = ({
  darkMode,
  setDarkMode,
  toggleFavorite,
  isFavorite,
  favorites,
}) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; //API
  const API_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (searchTerm = "") => {
    setLoading(true);
    const type = searchTerm ? "search/movie" : "discover/movie";
    const query = searchTerm
      ? `&query=${searchTerm}`
      : "&sort_by=popularity.desc";

    try {
      const response = await fetch(
        `${API_URL}/${type}?api_key=${API_KEY}&language=en-US${query}`
      );
      const data = await response.json();
      setMovies(data.results);
      setIsSearching(!!searchTerm);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const resetSearch = () => {
    setSearchKey("");
    setIsSearching(false);
    fetchMovies();
  };

  return (
    <div>
      <Navbar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={handleSearch}
        onClear={resetSearch}
        favCount={favorites.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container">
        <div className="grid-header">
          {isSearching ? (
            <div className="search-result-info">
              <h2>Search Results: "{searchKey}"</h2>
              <button onClick={resetSearch} className="btn-reset">
                <FaArrowLeft /> Back to Trending
              </button>
            </div>
          ) : (
            <h2 className="page-title">Trending Now</h2>
          )}
        </div>

        {loading ? (
          <div className="loader">Loading Movies...</div>
        ) : (
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            ))}

            {movies.length === 0 && (
              <div className="empty-search">
                <p>No movies found matching "{searchKey}"</p>
                <button
                  onClick={resetSearch}
                  className="btn-play"
                  style={{ marginTop: "20px" }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
