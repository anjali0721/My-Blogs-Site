import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Bookmarks from "./pages/Bookmarks";
import BlogForm from "./components/BlogForm";
import initialBlogs from "./data/blogsData";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("blogs_v2");
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [darkMode, setDarkMode] = useState(() => {
    try { return JSON.parse(localStorage.getItem("darkMode")) || false; } catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem("blogs_v2", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleLike = (id) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, likes: (b.likes || 0) + (b._liked ? -1 : 1), _liked: !b._liked } : b));
    const likedList = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    if (likedList.includes(id)) localStorage.setItem("likedBlogs", JSON.stringify(likedList.filter(x => x !== id)));
    else { likedList.push(id); localStorage.setItem("likedBlogs", JSON.stringify(likedList)); }
  };

  const toggleBookmark = (id) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, bookmarked: !b.bookmarked } : b));
    const bm = JSON.parse(localStorage.getItem("bookmarkedBlogs")) || [];
    if (bm.includes(id)) localStorage.setItem("bookmarkedBlogs", JSON.stringify(bm.filter(x => x !== id)));
    else { bm.push(id); localStorage.setItem("bookmarkedBlogs", JSON.stringify(bm)); }
  };

  const addComment = (id, text) => {
    if (!text || !text.trim()) return;
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, comments: [...(b.comments || []), { text, date: new Date().toISOString() }] } : b));
  };

  const addBlog = ({ title, author, category, content, image }) => {
    const newBlog = {
      id: Date.now(),
      title,
      category,
      author,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      image: image || initialBlogs[0].image,
      description: content.slice(0, 140),
      content,
      likes: 0,
      bookmarked: false,
      comments: []
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  return (
    <Router>
      <Navbar toggleTheme={() => setDarkMode(d => !d)} darkMode={darkMode} />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} onLike={toggleLike} onBookmark={toggleBookmark} />} />
        <Route path="/blog/:id" element={<BlogDetail blogs={blogs} onLike={toggleLike} onBookmark={toggleBookmark} addComment={addComment} />} />
        <Route path="/bookmarks" element={<Bookmarks blogs={blogs} onBookmark={toggleBookmark} onLike={toggleLike} />} />
        <Route path="/add" element={<BlogForm addBlog={addBlog} />} />
      </Routes>
    </Router>
  );
}

export default App;
