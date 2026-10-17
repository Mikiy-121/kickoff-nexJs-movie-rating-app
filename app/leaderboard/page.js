"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { getLeaderboardData } from "@/lib/animeData";

function LeaderboardContent() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getLeaderboardData();
      setLeaderboard(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading)
    return (
      <div className="page">
        <h2>Loading Leaderboard...</h2>
      </div>
    );

  return (
    <div className="page">
      <div className="leaderboard-header">
        <h1>🏆 Global Anime Leaderboard</h1>
        <p>
          Ranked by MyAnimeList community score. Rate them to see your personal
          stats!
        </p>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="rank-col">Rank</th>
              <th className="title-col">Anime</th>
              <th className="score-col">MAL Score</th>
              <th className="user-col">Your Rating</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((anime, index) => (
              <tr key={anime.mal_id} className="leaderboard-row">
                <td className="rank-col">
                  <span className={`rank-badge rank-${index + 1}`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="title-col">
                  <Link href={`/anime/${anime.mal_id}`} className="anime-link">
                    <img
                      src={anime.images?.jpg?.image_url}
                      alt={anime.title}
                      className="mini-poster"
                    />
                    <div className="anime-title-info">
                      <span className="anime-name">{anime.title}</span>
                      <span className="anime-meta">
                        {anime.type} • {anime.episodes || "?"} eps
                      </span>
                    </div>
                  </Link>
                </td>
                <td className="score-col">
                  <span className="mal-score">
                    ★ {anime.score ? anime.score.toFixed(1) : "N/A"}
                  </span>
                </td>
                <td className="user-col">
                  {anime.userRating ? (
                    <span className="user-rating-badge">
                      ★ {anime.userRating}/5
                    </span>
                  ) : (
                    <span className="not-rated">Not rated</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <Suspense
      fallback={
        <div className="page">
          <h2>Loading...</h2>
        </div>
      }
    >
      <LeaderboardContent />
    </Suspense>
  );
}
