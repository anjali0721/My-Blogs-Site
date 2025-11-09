import React from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const BlogDetail = ({ blogs, onLike, onBookmark, addComment }) => {
  const { id } = useParams();
  const blogId = parseInt(id, 10);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) return <div style={{ padding: 20 }}><h2>Blog not found</h2><Link to="/">Go home</Link></div>;

  return (
    <div style={{ padding: "1.5rem" }}>
      <div className="detail-wrap">
        <img src={blog.image} alt={blog.title} />
        <h1>{blog.title}</h1>
        <p className="meta">{blog.category} • By {blog.author} • {blog.date}</p>

        <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
          <button className="btn" onClick={() => onLike(blog.id)}>
            {blog._liked ? "❤️ Liked" : "🤍 Like"} {blog.likes ? `(${blog.likes})` : ""}
          </button>
          <button className="btn" onClick={() => onBookmark(blog.id)}>
            {blog.bookmarked ? "🔖 Bookmarked" : "📘 Save"}
          </button>
        </div>

        <p className="content" style={{ lineHeight: 1.7 }}>{blog.content}</p>

        <CommentSection blogId={blog.id} initialComments={blog.comments || []} addComment={addComment} />
      </div>
    </div>
  );
};

export default BlogDetail;
