// src/pages/Home.js
import React, { useState, useEffect } from "react";
import blogsData from "../data/blogsData";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const [quote, setQuote] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Fetch a random motivational quote from local list
  useEffect(() => {
    const quotes = [
      "“Success is not final; failure is not fatal: It is the courage to continue that counts.”",
      "“The only way to do great work is to love what you do.”",
      "“Dream big, start small, act now.”",
      "“Don’t watch the clock; do what it does. Keep going.”",
      "“Push yourself, because no one else is going to do it for you.”",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.className = isDark ? "light-mode" : "dark-mode";
  };

  // Like and Bookmark functions
  const handleLike = (id) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...b, likes: b.likes + 1 } : b
      )
    );
  };

  const handleBookmark = (id) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...b, bookmarked: !b.bookmarked } : b
      )
    );
  };

  // Sort trending blogs (Top 3)
  const trendingBlogs = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div
      style={{
        background: "var(--bg-color)",
        color: "var(--text-color)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>📝 My Blog World</h1>
        <button
          onClick={toggleDarkMode}
          style={{
            background: "var(--accent-color)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Quote of the Day */}
      <section
        style={{
          background: "var(--card-bg)",
          padding: "15px 20px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "30px",
          fontStyle: "italic",
        }}
      >
        <p>{quote}</p>
      </section>

      {/* Trending Section */}
      <h2 style={{ marginBottom: "10px" }}>🔥 Trending Blogs</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {trendingBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {/* All Blogs Section */}
      <h2 style={{ marginBottom: "10px" }}>📰 All Blogs</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
