"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { getLeaderboardData } from "@/lib/animeData";

function LeaderboardContent() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("global"); // 'global' or 'personal'

  useEffect(() => {
    async function loadData() {
      const data = await getLeaderboardData();
      setLeaderboard(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Dynamic Sorting Logic
  const sortedLeaderboard = useMemo(() => {
    if (!leaderboard.length) return [];

    const sorted = [...leaderboard];

    if (viewMode === "global") {
      // Sort by MyAnimeList Score (Highest to Lowest)
      sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else {
      // Sort by User's Personal Rating
      sorted.sort((a, b) => {
        const ratingA = a.userRating || 0;
        const ratingB = b.userRating || 0;

        // If both are rated, sort by highest rating
        if (ratingA > 0 && ratingB > 0) return ratingB - ratingA;

        // If only one is rated, the rated one goes to the top
        if (ratingA > 0 && ratingB === 0) return -1;
        if (ratingA === 0 && ratingB > 0) return 1;

        // If neither is rated, fallback to MAL score
        return (b.score || 0) - (a.score || 0);
      });
    }

    return sorted;
  }, [leaderboard, viewMode]);

  if (loading)
    return (
      <div className="page">
        <h2>Loading Leaderboard...</h2>
      </div>
    );

  return (
    <div className="page">
      <div className="leaderboard-header">
        <h1>🏆 Anime Leaderboard</h1>
        <p>Track global scores and your personal favorites.</p>

        {/* Toggle Buttons */}
        <div className="leaderboard-tabs">
          <button
            className={`tab-btn ${viewMode === "global" ? "active" : ""}`}
            onClick={() => setViewMode("global")}
          >
            Global Rankings
          </button>
          <button
            className={`tab-btn ${viewMode === "personal" ? "active" : ""}`}
            onClick={() => setViewMode("personal")}
          >
            My Rankings
          </button>
        </div>
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
            {sortedLeaderboard.map((anime, index) => (
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
