"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getComments,
  addComment,
  saveUserRating,
  getUserRatings,
} from "@/lib/userStorage";
import { useAuth } from "@/context/AuthContext";

// Interactive part of the details page. The anime info is rendered on the
// server and passed in as `poster` and `info`.
export default function AnimeInteractions({ animeId, poster, info }) {
  const router = useRouter();
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComments(getComments(animeId));
    const savedRatings = getUserRatings();
    if (savedRatings[animeId]) setUserRating(savedRatings[animeId]);
  }, [animeId]);

  function handleRate(rating) {
    if (!user) {
      router.push("/login");
      return;
    }
    setUserRating(rating);
    saveUserRating(animeId, rating);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!commentText.trim()) return;
    const newComment = addComment(
      animeId,
      user.username,
      commentText,
      userRating,
    );
    setComments([newComment, ...comments]);
    setCommentText("");
  }

  return (
    <>
      <div className="anime-header">
        {poster}
        <div className="anime-info">
          {info}

          <div className="user-rating-section">
            <h3>
              Your Rating{" "}
              {!user && (
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-faint)",
                    fontWeight: 400,
                  }}
                >
                  (Log in to save)
                </span>
              )}
            </h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star ${userRating >= star ? "active" : ""}`}
                  onClick={() => handleRate(star)}
                >
                  ★
                </button>
              ))}
            </div>
            {userRating > 0 && (
              <p style={{ marginTop: "0.75rem", color: "var(--text-dim)" }}>
                You rated: {userRating}/5
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <textarea
            placeholder={
              !user
                ? "Log in to share your thoughts..."
                : "Share your thoughts..."
            }
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
            rows="3"
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>

        <div>
          {comments.length === 0 ? (
            <p style={{ color: "var(--text-faint)", textAlign: "center" }}>
              No comments yet.
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="comment-avatar"
                  />
                  <span className="comment-username">{comment.username}</span>
                  {comment.rating && (
                    <span className="comment-rating">★ {comment.rating}/5</span>
                  )}
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
