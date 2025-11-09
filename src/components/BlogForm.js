import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState(""); // can paste local import path via /assets/ or URL
  const [content, setContent] = useState("");

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("Please fill title, author and content.");
      return;
    }
    addBlog({ title, author, category, image, content });
    nav("/");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Add New Blog</h2>
        <div className="form-row">
          <input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div className="form-row">
          <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
            <option>Technology</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Lifestyle</option>
            <option>Education</option>
            <option>Motivation</option>
          </select>
          <input className="input" placeholder="Image path (optional) e.g. /assets/your.jpg" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <textarea className="input" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <div style={{ marginTop: 10 }}>
          <button type="submit" className="submit-btn">Add Blog</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
