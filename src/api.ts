const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzk0MTZkMzExNTcxODZlYWFkNzcwNTNjMzU5ZTNiZCIsIm5iZiI6MTcxOTgwMjk0NS40OTMyOTUsInN1YiI6IjY2ODIxYTgwOTJmNjFkOTFiMDE2NGVlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_z9331kwKIWm-pTHqOqDthzNYQs0slgWzTX1Pe4vaM";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoviesResult  {
  dates: {
    maximum: string,
    minimum: string,
  },
  page: number,
  results: IMovie[],
  total_pages: number,
  total_results: number,
};

export interface IMovie {
  id: number,
  backdrop_path: string,
  poster_path: string,
  title: string,
  overview: string,
  vote_average: number,
  release_date: string,
}

export function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=kr",
    options
  ).then((response) => response.json());
}
