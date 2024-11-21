import { useState, useEffect } from "react";

// Mock data for testing
const generateMockData = (count) => {
  const baseData = {
    title: "Oppenheimer",
    description:
      "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    big_image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    genre: ["Biography", "Drama", "History"],
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_UY67_CR0,0,45,67_AL_.jpg",
    rating: "8.6",
    imdbid: "tt15398776",
    imdb_link: "https://www.imdb.com/title/tt15398776",
  };

  return Array.from({ length: count }, (_, index) => ({
    ...baseData,
    id: `top${index + 1}`, // Unique ID for each movie
    rank: 32 + index, // Increment rank for each movie
    year: 2023 - index, // Vary the year (just an example)
    rating: 8.6 - index, // Vary the year (just an example)
  }));
};

// Generate 8 mock data objects
const mockData = generateMockData(8);

const useFetchData = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchEnabled, setFetchEnabled] = useState(false); // Add toggle for real API fetch

  useEffect(() => {
    if (fetchEnabled) {
      // Perform the real fetch logic here if fetchEnabled is true
      // Simulating a real fetch request
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://imdb-top-100-movies.p.rapidapi.com/",
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
                "x-rapidapi-key":
                  "6e3afe286emshe5b3a9b6318df92p1efe47jsn078f35ab17d8",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setMovies(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      // Use mock data if fetch is disabled
      setMovies(mockData);
      setLoading(false);
    }
  }, [fetchEnabled]);

  return { movies, loading, error, setFetchEnabled };
};

export default useFetchData;
