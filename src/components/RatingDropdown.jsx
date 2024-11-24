import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
const RatingDropdown = ({
  movies,
  setFilteredMovies,
  setFilteredCount,
  minRating,
  maxRating,
  setMinRating,
  setMaxRating,
}) => {
  useEffect(() => {
    // Filter movies whenever minRating or maxRating changes
    if (Array.isArray(movies) && movies.length > 0) {
      const filtered = movies.filter(
        (movie) => movie.rating >= minRating && movie.rating <= maxRating
      );
      setFilteredMovies(filtered);
      setFilteredCount(filtered.length); // Update the count of filtered movies
    }
  }, [minRating, maxRating, movies, setFilteredMovies, setFilteredCount]);

  // Generate options from 1 to 10
  const ratingOptions = [];
  for (let i = 1; i <= 10; i += 0.5) {
    ratingOptions.push(i.toFixed(1));
  }

  return (
    <div className="flex p-2 items-center justify-center">
      <h3>
        <FaStar fill="orange" className="mr-2" />
      </h3>
      <select
        id="min-rating"
        value={minRating.toFixed(1)} // Ensure minRating is displayed as 1.0, 1.5, etc.
        onChange={(e) => setMinRating(parseFloat(e.target.value))}
        className="mr-2 p-1 rounded"
      >
        {ratingOptions.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      -
      <select
        id="max-rating"
        value={maxRating.toFixed(1)} 
        onChange={(e) => setMaxRating(parseFloat(e.target.value))}
        className="ml-2 p-1 rounded"
      >
        {ratingOptions.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingDropdown;
