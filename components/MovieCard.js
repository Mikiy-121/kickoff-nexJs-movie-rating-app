import Link from "next/link";

export default function MovieCard({ anime }) {
  if (!anime) return null;
  const imageUrl = anime.images?.jpg?.image_url;
  const score = anime.score ? anime.score.toFixed(1) : "N/A";

  return (
    <Link href={`/anime/${anime.mal_id}`} className="movie-card">
      <div className="poster-frame">
        {imageUrl ? (
          <img src={imageUrl} alt={anime.title} loading="lazy" />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--text-faint)",
            }}
          >
            No Image
          </div>
        )}
        <div className="poster-overlay">
          <span className="poster-score">★ {score}</span>
        </div>
      </div>
      <h3 className="movie-title">{anime.title}</h3>
      <p className="movie-meta">
        {anime.type} • {anime.status}
      </p>
    </Link>
  );
}
