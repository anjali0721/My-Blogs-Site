import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, onLike, onBookmark }) => {
  return (
    <article className="card">
      <img src={blog.image} alt={blog.title} />
      <div className="card-body">
        <h3>{blog.title}</h3>
        <p className="meta">{blog.category} • {blog.author} • {blog.date}</p>
        <p>{blog.description}</p>

        <div className="actions">
          <button className="btn" onClick={() => onLike(blog.id)}>
            {blog._liked ? "❤️ Liked" : "🤍 Like"} {blog.likes ? `(${blog.likes})` : ""}
          </button>

          <button className="btn" onClick={() => onBookmark(blog.id)}>
            {blog.bookmarked ? "🔖 Bookmarked" : "📘 Save"}
          </button>

          <Link to={`/blog/${blog.id}`} className="read-more" style={{ marginLeft: "auto" }}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
