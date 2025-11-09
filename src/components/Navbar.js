import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ toggleTheme, darkMode }) => {
  const loc = useLocation();
  return (
    <header className="navbar">
      <div className="brand">
        <h2>My Blog</h2>
      </div>
      <nav className="nav-links">
        <Link to="/" className={loc.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/bookmarks" className={loc.pathname === "/bookmarks" ? "active" : ""}>Bookmarks</Link>
        <Link to="/add">Add Blog</Link>
        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
