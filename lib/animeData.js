import { cacheLife } from "next/cache";

// Expanded Fallback List (20+ Top Anime)
const FALLBACK_ANIME = [
  {
    mal_id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1223/96541l.jpg",
      },
    },
    score: 9.1,
    episodes: 64,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "After a horrific alchemy experiment goes wrong...",
    aired: { string: "Apr 5, 2009" },
    duration: "24 min",
    studios: [{ name: "Bones" }],
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Drama" }],
  },
  {
    mal_id: 9253,
    title: "Steins;Gate",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/5/73199l.jpg",
      },
    },
    score: 9.1,
    episodes: 24,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "A self-proclaimed mad scientist discovers time travel...",
    aired: { string: "Apr 6, 2011" },
    duration: "24 min",
    studios: [{ name: "White Fox" }],
    genres: [{ name: "Drama" }, { name: "Sci-Fi" }, { name: "Thriller" }],
  },
  {
    mal_id: 38524,
    title: "Shingeki no Kyojin Season 3 Part 2",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1517/100633l.jpg",
      },
    },
    score: 9.0,
    episodes: 10,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "The truth of the world is revealed...",
    aired: { string: "Apr 29, 2019" },
    duration: "23 min",
    studios: [{ name: "Wit Studio" }],
    genres: [{ name: "Action" }, { name: "Drama" }],
  },
  {
    mal_id: 28977,
    title: "Gintama°",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/3/72078.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/3/72078l.jpg",
      },
    },
    score: 9.0,
    episodes: 51,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "Gintoki and his friends continue their adventures...",
    aired: { string: "Apr 8, 2015" },
    duration: "24 min",
    studios: [{ name: "Bandai Namco Pictures" }],
    genres: [{ name: "Action" }, { name: "Comedy" }],
  },
  {
    mal_id: 11061,
    title: "Hunter x Hunter (2011)",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      },
    },
    score: 9.0,
    episodes: 148,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "Gon Freecss aspires to become a Hunter...",
    aired: { string: "Oct 2, 2011" },
    duration: "23 min",
    studios: [{ name: "Madhouse" }],
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
  },
  {
    mal_id: 820,
    title: "Ginga Eiyuu Densetsu",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/13/13225.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/13/13225l.jpg",
      },
    },
    score: 9.0,
    episodes: 110,
    type: "OVA",
    status: "Finished Airing",
    rating: "R",
    synopsis: "A space opera epic...",
    aired: { string: "Jan 8, 1988" },
    duration: "25 min",
    studios: [{ name: "Kitty Films" }],
    genres: [{ name: "Drama" }, { name: "Sci-Fi" }],
  },
  {
    mal_id: 1535,
    title: "Death Note",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
      },
    },
    score: 8.6,
    episodes: 37,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "A high school student finds a notebook that kills...",
    aired: { string: "Oct 4, 2006" },
    duration: "23 min",
    studios: [{ name: "Madhouse" }],
    genres: [{ name: "Supernatural" }, { name: "Thriller" }],
  },
  {
    mal_id: 16498,
    title: "Shingeki no Kyojin",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
      },
    },
    score: 8.5,
    episodes: 25,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "Humanity fights for survival against Titans...",
    aired: { string: "Apr 7, 2013" },
    duration: "24 min",
    studios: [{ name: "Wit Studio" }],
    genres: [{ name: "Action" }, { name: "Drama" }, { name: "Fantasy" }],
  },
  {
    mal_id: 40748,
    title: "Jujutsu Kaisen",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
      },
    },
    score: 8.6,
    episodes: 24,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "A boy swallows a cursed talisman...",
    aired: { string: "Oct 3, 2020" },
    duration: "23 min",
    studios: [{ name: "MAPPA" }],
    genres: [{ name: "Action" }, { name: "Fantasy" }],
  },
  {
    mal_id: 38000,
    title: "Kimetsu no Yaiba",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      },
    },
    score: 8.5,
    episodes: 26,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "A boy becomes a demon slayer to save his sister...",
    aired: { string: "Apr 6, 2019" },
    duration: "23 min",
    studios: [{ name: "ufotable" }],
    genres: [{ name: "Action" }, { name: "Fantasy" }],
  },
  {
    mal_id: 20,
    title: "Naruto",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
      },
    },
    score: 8.0,
    episodes: 220,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "A young ninja seeks recognition...",
    aired: { string: "Oct 3, 2002" },
    duration: "23 min",
    studios: [{ name: "Studio Pierrot" }],
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
  },
  {
    mal_id: 21,
    title: "One Piece",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
      },
    },
    score: 8.7,
    episodes: 1000,
    type: "TV",
    status: "Currently Airing",
    rating: "PG-13",
    synopsis: "Monkey D. Luffy sets off on an adventure...",
    aired: { string: "Oct 20, 1999" },
    duration: "24 min",
    studios: [{ name: "Toei Animation" }],
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
  },
  {
    mal_id: 48316,
    title: "Spy x Family",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
      },
    },
    score: 8.5,
    episodes: 12,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "A spy must build a fake family...",
    aired: { string: "Apr 9, 2022" },
    duration: "24 min",
    studios: [{ name: "Wit Studio" }],
    genres: [{ name: "Action" }, { name: "Comedy" }],
  },
  {
    mal_id: 32281,
    title: "Kimi no Na wa.",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/5/87048l.jpg",
      },
    },
    score: 8.8,
    episodes: 1,
    type: "Movie",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "Two teenagers share a mysterious connection...",
    aired: { string: "Aug 26, 2016" },
    duration: "1 hr 46 min",
    studios: [{ name: "CoMix Wave Films" }],
    genres: [{ name: "Drama" }, { name: "Romance" }, { name: "Supernatural" }],
  },
  {
    mal_id: 1,
    title: "Cowboy Bebop",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
      },
    },
    score: 8.7,
    episodes: 26,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "Bounty hunters in space...",
    aired: { string: "Apr 3, 1998" },
    duration: "24 min",
    studios: [{ name: "Sunrise" }],
    genres: [{ name: "Action" }, { name: "Sci-Fi" }],
  },
  {
    mal_id: 1575,
    title: "Code Geass: Hangyaku no Lelouch",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/5/50331.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/5/50331l.jpg",
      },
    },
    score: 8.7,
    episodes: 25,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "An exiled prince gains the power of absolute obedience...",
    aired: { string: "Oct 6, 2006" },
    duration: "24 min",
    studios: [{ name: "Sunrise" }],
    genres: [{ name: "Action" }, { name: "Drama" }, { name: "Sci-Fi" }],
  },
  {
    mal_id: 31964,
    title: "Boku no Hero Academia",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/10/78745l.jpg",
      },
    },
    score: 7.9,
    episodes: 13,
    type: "TV",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis:
      "A boy born without superpowers in a world where they are common...",
    aired: { string: "Apr 3, 2016" },
    duration: "24 min",
    studios: [{ name: "Bones" }],
    genres: [{ name: "Action" }, { name: "Adventure" }],
  },
  {
    mal_id: 44511,
    title: "Chainsaw Man",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
      },
    },
    score: 8.5,
    episodes: 12,
    type: "TV",
    status: "Finished Airing",
    rating: "R",
    synopsis: "Denji is a teenage boy living with a Chainsaw Devil...",
    aired: { string: "Oct 12, 2022" },
    duration: "24 min",
    studios: [{ name: "MAPPA" }],
    genres: [{ name: "Action" }, { name: "Fantasy" }],
  },
  {
    mal_id: 164,
    title: "Mononoke Hime",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/7/75919.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/7/75919l.jpg",
      },
    },
    score: 8.7,
    episodes: 1,
    type: "Movie",
    status: "Finished Airing",
    rating: "PG-13",
    synopsis: "A prince becomes involved in a struggle between forest gods...",
    aired: { string: "Jul 12, 1997" },
    duration: "2 hr 14 min",
    studios: [{ name: "Studio Ghibli" }],
    genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Fantasy" }],
  },
  {
    mal_id: 199,
    title: "Sen to Chihiro no Kamikakushi",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
      },
    },
    score: 8.8,
    episodes: 1,
    type: "Movie",
    status: "Finished Airing",
    rating: "PG",
    synopsis: "A girl enters a world ruled by gods and witches...",
    aired: { string: "Jul 20, 2001" },
    duration: "2 hr 5 min",
    studios: [{ name: "Studio Ghibli" }],
    genres: [
      { name: "Adventure" },
      { name: "Drama" },
      { name: "Supernatural" },
    ],
  },
];

export const FALLBACK_IDS = FALLBACK_ANIME.map((a) => a.mal_id);

// Give the external API a short budget so a slow response never blocks the page.
const API_TIMEOUT_MS = 4000;

// Failures are handled inside the cached functions: an error thrown from a
// "use cache" scope fails the prerender. Fallback data is only cached briefly
// so live data is picked up again soon after the API recovers.
export async function fetchTopAnime() {
  "use cache";
  try {
agent-site-bb1c

    // Timer removed for instant loading
 main
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?limit=24&filter=bypopularity",
      { signal: AbortSignal.timeout(API_TIMEOUT_MS) },
    );
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const data = await response.json();
    if (!data.data?.length) throw new Error("API returned no anime");
    cacheLife("hours");
    return data.data;
  } catch (error) {
    console.warn("API failed. Using fallback.", error.message);
    cacheLife("minutes");
    return FALLBACK_ANIME;
  }
}

async function getAnimeDetails(mal_id) {
  "use cache";
  try {
 agent-site-bb1c

    // Timer removed for instant loading
main
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${mal_id}/full`,
      { signal: AbortSignal.timeout(API_TIMEOUT_MS) },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!data.data) throw new Error("Anime not found");
    cacheLife("days");
    return data.data;
  } catch (error) {
    console.warn(
      `Details API failed for ID ${mal_id}. Using fallback.`,
      error.message,
    );
    cacheLife("minutes");
    return FALLBACK_ANIME.find((a) => a.mal_id === Number(mal_id)) || null;
  }
}

export async function fetchAnimeDetails(mal_id) {
  return getAnimeDetails(String(mal_id));
}

// --- LEADERBOARD ---
// User ratings live in localStorage, so they are merged in on the client.
export async function getLeaderboardData() {
  return [...FALLBACK_ANIME].sort((a, b) => (b.score || 0) - (a.score || 0));
}
