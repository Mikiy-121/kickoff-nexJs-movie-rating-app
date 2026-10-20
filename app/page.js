import { fetchTopAnime } from "@/lib/animeData";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const animeList = await fetchTopAnime();

  return (
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
          {animeList.map((anime, index) => (
            <MovieCard key={anime.mal_id} anime={anime} priority={index < 6} />
          ))}
        </div>
      </section>
    </div>
  );
}
