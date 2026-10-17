"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  fetchAnimeDetails,
  getComments,
  addComment,
  saveUserRating,
  getUserRatings,
} from "@/lib/animeData";
import { useAuth } from "@/context/AuthContext";

function AnimeDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      setLoading(true);
      const data = await fetchAnimeDetails(id);
      if (data) {
        setAnime(data);
        setComments(getComments(data.mal_id));
        const savedRatings = getUserRatings();
        if (savedRatings[data.mal_id]) setUserRating(savedRatings[data.mal_id]);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  function handleRate(rating) {
    if (!user) {
      router.push("/login");
      return;
    }
    setUserRating(rating);
    saveUserRating(anime.mal_id, rating);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!commentText.trim()) return;
    const newComment = addComment(
      anime.mal_id,
      user.username,
      commentText,
      userRating,
    );
    setComments([newComment, ...comments]);
    setCommentText("");
  }

  if (loading)
    return (
      <div className="page">
        <h2>Loading details...</h2>
      </div>
    );
  if (!anime)
    return (
      <div className="page">
        <h1>Anime not found</h1>
        <Link href="/" className="btn">
          Back
        </Link>
      </div>
    );

  const imageUrl =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  return (
    <div className="anime-details-page">
      <Link
        href="/"
        className="btn"
        style={{ marginBottom: "1.5rem", display: "inline-block" }}
      >
        ← Back to List
      </Link>

      <div className="anime-header">
        <div className="anime-poster">
          {imageUrl ? (
            <img src={imageUrl} alt={anime.title} />
          ) : (
            <div>No Image</div>
          )}
        </div>
        <div className="anime-info">
          <h1>{anime.title}</h1>
          <div className="anime-meta-tags">
            <span className="tag type">{anime.type}</span>
            <span className="tag">{anime.rating || "N/A"}</span>
            <span className="tag">{anime.episodes || "?"} eps</span>
            <span className="score-large">
              ★ {anime.score ? anime.score.toFixed(1) : "N/A"}/10
            </span>
          </div>
          <p className="synopsis">
            {anime.synopsis || "No synopsis available."}
          </p>

          <div className="anime-details-grid">
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{anime.status || "Unknown"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Aired:</span>
              <span className="detail-value">
                {anime.aired?.string || "Unknown"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Studios:</span>
              <span className="detail-value">
                {anime.studios?.map((s) => s.name).join(", ") || "Unknown"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Genres:</span>
              <span className="detail-value">
                {anime.genres?.map((g) => g.name).join(", ") || "Unknown"}
              </span>
            </div>
          </div>

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
    </div>
  );
}

export default function AnimeDetails() {
  return (
    <Suspense
      fallback={
        <div className="page">
          <h2>Loading anime details...</h2>
        </div>
      }
    >
      <AnimeDetailsContent />
    </Suspense>
  );
}
