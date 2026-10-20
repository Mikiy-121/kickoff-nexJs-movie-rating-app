// Browser-only helpers for data stored in localStorage.

export function getComments(animeId) {
  if (typeof window === "undefined") return [];
  try {
    const allComments = JSON.parse(
      localStorage.getItem("animeComments") || "{}",
    );
    return allComments[animeId] || [];
  } catch {
    return [];
  }
}

export function addComment(animeId, username, commentText, rating) {
  const allComments = JSON.parse(localStorage.getItem("animeComments") || "{}");
  if (!allComments[animeId]) allComments[animeId] = [];
  const newComment = {
    id: Date.now(),
    username: username.trim() || "Anonymous",
    text: commentText.trim(),
    rating: rating,
    date: new Date().toISOString(),
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username.trim() || "A")}&background=random`,
  };
  allComments[animeId].unshift(newComment);
  localStorage.setItem("animeComments", JSON.stringify(allComments));
  return newComment;
}

export function getUserRatings() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("userRatings") || "{}");
  } catch {
    return {};
  }
}

export function saveUserRating(animeId, rating) {
  const ratings = getUserRatings();
  ratings[animeId] = rating;
  localStorage.setItem("userRatings", JSON.stringify(ratings));
}
