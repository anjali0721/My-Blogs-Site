import React, { useState, useEffect } from "react";

const CommentSection = ({ blogId, initialComments = [], addComment }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];
    setComments(saved);
  }, [blogId]);

  useEffect(() => {
    localStorage.setItem(`comments_${blogId}`, JSON.stringify(comments));
  }, [comments, blogId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComments = [...comments, { text: text.trim(), date: new Date().toISOString() }];
    setComments(newComments);
    addComment(blogId, text.trim()); // update app state too
    setText("");
  };

  return (
    <div style={{ marginTop: 18 }}>
      <h3>Comments 💬</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input className="input" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} />
        <button className="btn" type="submit">Add</button>
      </form>

      {comments.length === 0 ? <p className="meta">No comments yet — be the first!</p> : (
        comments.map((c, i) => (
          <div className="comment" key={i}>
            <div>{c.text}</div>
            <div className="comment-date">{new Date(c.date).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
