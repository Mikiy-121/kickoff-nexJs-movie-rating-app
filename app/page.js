/* eslint-disable react-hooks/immutability */
"use client";
import { useState, useEffect, Suspense } from "react";
import { fetchTopAnime } from "@/lib/animeData";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnimeList();
  }, []);

  async function loadAnimeList() {
    setLoading(true);
    const data = await fetchTopAnime();
    setAnimeList(data);
    setLoading(false);
  }

  if (loading)
    return (
      <div className="page">
        <h2>Loading Anime...</h2>
      </div>
    );

  return (
    <Suspense
      fallback={
        <div className="page">
          <h2>Loading...</h2>
        </div>
      }
    >
      <div className="page">
        <section className="hero">
          <div className="hero-content">
            <h1>Kickoff Anime Rating App</h1>
            <p>Discover, rate, and discuss the best anime.</p>
          </div>
        </section>
        <section className="anime-section">
          <h2>Popular Anime ({animeList.length})</h2>
          <div className="movie-grid">
            {animeList.map((anime) => (
              <MovieCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </Suspense>
  );
}
