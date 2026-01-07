import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <div className="content-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />
            <Route
              path="/movie/:id"
              element={
                <MovieDetail
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  favorites={favorites}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
