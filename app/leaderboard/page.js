import { getLeaderboardData } from "@/lib/animeData";
import LeaderboardTable from "@/components/LeaderboardTable";

export default async function Leaderboard() {
  const animeList = await getLeaderboardData();
  return <LeaderboardTable animeList={animeList} />;
}
