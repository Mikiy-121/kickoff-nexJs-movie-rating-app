import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ anime, priority = false }) {
  if (!anime) return null;
  const imageUrl = anime.images?.jpg?.image_url;
  const score = anime.score ? anime.score.toFixed(1) : "N/A";

  return (
    <Link href={`/anime/${anime.mal_id}`} className="movie-card">
      <div className="poster-frame">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            loading={priority ? "eager" : "lazy"}
          />
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
