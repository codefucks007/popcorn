import React from "react";
import { FaSearch, FaMoon, FaSun, FaHeart, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  searchKey,
  setSearchKey,
  onSearch,
  onClear,
  darkMode,
  setDarkMode,
  favCount,
}) => {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={onClear}>
        🍿 Popcorn
      </Link>

      <div className="nav-actions">
        {onSearch && location.pathname === "/" && (
          <form onSubmit={onSearch} className="search-form">
            <div className="search-box-wrapper">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              {searchKey && (
                <button type="button" className="btn-clear" onClick={onClear}>
                  <FaTimes />
                </button>
              )}
              <button type="submit" className="btn-search-icon">
                <FaSearch />
              </button>
            </div>
          </form>
        )}

        <Link to="/favorites" className="nav-link">
          <div className="nav-icon-wrapper">
            <FaHeart className="nav-icon" />
            {favCount > 0 && <span className="fav-badge">{favCount}</span>}
          </div>
          <span className="nav-text">Favorites</span>
        </Link>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
