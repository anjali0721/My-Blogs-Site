import React from "react";
import BlogCard from "../components/BlogCard";

const Bookmarks = ({ blogs, onBookmark, onLike }) => {
  const bookmarked = blogs.filter(b => b.bookmarked);
  return (
    <main className="container">
      <h2 style={{ marginBottom: 12 }}>Bookmarked Posts</h2>
      <div className="grid">
        {bookmarked.length === 0 ? <p style={{ padding: 20 }}>You have no bookmarks yet.</p> :
          bookmarked.map(b => <BlogCard key={b.id} blog={b} onLike={onLike} onBookmark={onBookmark} />)
        }
      </div>
    </main>
  );
};

export default Bookmarks;
