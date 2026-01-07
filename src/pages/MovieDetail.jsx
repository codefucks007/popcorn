import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaArrowLeft,
  FaPlay,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const MovieDetail = ({
  darkMode,
  setDarkMode,
  toggleFavorite,
  isFavorite,
  favorites,
}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; //API
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const PROFILE_PATH = "https://image.tmdb.org/t/p/w185";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const [resMovie, resCredits, resVideos] = await Promise.all([
        fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
        fetch(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`),
        fetch(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`),
      ]);

      const dataMovie = await resMovie.json();
      const dataCredits = await resCredits.json();
      const dataVideos = await resVideos.json();

      setMovie(dataMovie);

      const dir = dataCredits.crew.find((person) => person.job === "Director");
      setDirector(dir);
      setCast(dataCredits.cast.slice(0, 10));

      const officialTrailer = dataVideos.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(officialTrailer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loader">Loading Details...</div>;
  if (!movie) return <div className="loader">Movie not found</div>;

  return (
    <div>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favCount={favorites ? favorites.length : 0}
      />

      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${IMAGE_PATH}${movie.backdrop_path})`,
        }}
      >
        <div className="hero-content">
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back
          </Link>

          <h1>{movie.title}</h1>
          <div className="hero-meta">
            <span className="rating">
              <FaStar color="gold" /> {movie.vote_average.toFixed(1)}
            </span>
            <span>
              {" "}
              • {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </span>
            <span> • {movie.runtime} min</span>
          </div>

          <div className="genres">
            {movie.genres.map((g) => (
              <span key={g.id} className="genre-badge">
                {g.name}
              </span>
            ))}
          </div>

          <p className="overview">
            {movie.overview || "No overview available."}
          </p>

          <div className="director-info">
            <span className="director-label">Director</span>
            {director ? (
              <div className="director-profile">
                {director.profile_path ? (
                  <img
                    src={`${PROFILE_PATH}${director.profile_path}`}
                    alt={director.name}
                    className="director-img"
                  />
                ) : (
                  <div className="director-placeholder">
                    {director.name.charAt(0)}
                  </div>
                )}
                <span className="director-name">{director.name}</span>
              </div>
            ) : (
              <span style={{ color: "#aaa" }}>Unknown</span>
            )}
          </div>

          <div className="hero-buttons">
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="btn-play"
              >
                <FaPlay /> Watch Trailer
              </a>
            )}

            <button
              className={`btn-fav ${isFavorite(movie.id) ? "active" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              {isFavorite(movie.id) ? <FaHeart /> : <FaRegHeart />}
              {isFavorite(movie.id) ? " Favorited" : " Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <h3>Top Cast</h3>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-card">
              {actor.profile_path ? (
                <img
                  src={`${PROFILE_PATH}${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className="no-image-cast">No Image</div>
              )}
              <div className="cast-info">
                <p className="actor-name">{actor.name}</p>
                <p className="actor-char">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
