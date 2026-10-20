import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchAnimeDetails, FALLBACK_IDS } from "@/lib/animeData";
import AnimeInteractions from "@/components/AnimeInteractions";

// Prerender one page at build time; the rest render on first visit and are cached.
export function generateStaticParams() {
  return [{ id: String(FALLBACK_IDS[0]) }];
}

async function AnimeDetailsContent({ params }) {
  const { id } = await params;
  const anime = await fetchAnimeDetails(id);

  if (!anime)
    return (
      <>
        <h1>Anime not found</h1>
        <Link href="/" className="btn">
          Back
        </Link>
      </>
    );

  const imageUrl =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  const poster = (
    <div className="anime-poster">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={anime.title}
          width={300}
          height={450}
          sizes="(max-width: 768px) 100vw, 300px"
          loading="eager"
        />
      ) : (
        <div>No Image</div>
      )}
    </div>
  );

  const info = (
    <>
      <h1>{anime.title}</h1>
      <div className="anime-meta-tags">
        <span className="tag type">{anime.type}</span>
        <span className="tag">{anime.rating || "N/A"}</span>
        <span className="tag">{anime.episodes || "?"} eps</span>
        <span className="score-large">
          ★ {anime.score ? anime.score.toFixed(1) : "N/A"}/10
        </span>
      </div>
      <p className="synopsis">{anime.synopsis || "No synopsis available."}</p>

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
    </>
  );

  return (
    <AnimeInteractions animeId={anime.mal_id} poster={poster} info={info} />
  );
}

export default function AnimeDetails({ params }) {
  return (
    <div className="anime-details-page">
      <Link
        href="/"
        className="btn"
        style={{ marginBottom: "1.5rem", display: "inline-block" }}
      >
        ← Back to List
      </Link>
      <Suspense
        fallback={
          <div className="anime-header">
            <div className="anime-poster skeleton skeleton-poster" />
            <div className="anime-info">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
          </div>
        }
      >
        <AnimeDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
