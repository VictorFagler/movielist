import React, { useState, useEffect, useMemo, useCallback } from "react";
import useFetchData from "../hooks/useFetchData";
import Movies from "./Movies";
import SearchBar from "./SearchBar";
import SortMovies from "./SortMovies";
import RatingDropdown from "./RatingDropdown"; 
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  &:active {
    background-color: #1f6c91;
  }

  &:focus {
    outline: none;
  }
`;

const MovieList = () => {
  const { movies, loading, error, setFetchEnabled } = useFetchData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(10);

  useEffect(() => {
    if (Array.isArray(movies)) {
      setFilteredMovies(movies);
    }
  }, [movies]);

  // Handle search input using useCallback
  const handleSearchChange = useCallback(
    (query) => {
      setSearchQuery(query);
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    },
    [movies] // Only recreate function if `movies` changes
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setFilteredMovies(movies);
  }, [movies]); // Only recreate function if `movies` changes

  const handleSortChange = useCallback((newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  }, []); 

    // Memoize sortedMovies to avoid recalculating unnecessarily
  const sortedMovies = useMemo(() => {
    console.log("Sorting movies...");
    let sorted = [...filteredMovies];
    switch (sortCriteria) {
      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "release_date":
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredMovies, sortCriteria]);

  // Ensure filteredMovies is always an array, even if movies is empty
  if (!Array.isArray(filteredMovies)) {
    return <p>Something went wrong. Movies data is not available.</p>;
  }

  return (
    <div>
      <div
        id="header"
        className="flex justify-between items-center px-8 bg-gray-200"
      >
        <h2 className="flex font-bold p-6 text-4xl">Top 100 Movies</h2>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange} // Optimized with useCallback
          onClearSearch={handleClearSearch} // Optimized with useCallback
        />
        <div>
          <ButtonContainer>
            <StyledButton onClick={() => setFetchEnabled(false)}>
              Stop Fetching
            </StyledButton>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton onClick={() => setFetchEnabled(true)}>
              Start Fetching
            </StyledButton>
          </ButtonContainer>
        </div>
      </div>
      <div className="flex pt-4 justify-between items-center mx-12">
        <div>
          <p>
            Showing movies with ratings between {minRating} and {maxRating}.
          </p>
        </div>
        <div className="flex">
          <div className="mr-6">
            <RatingDropdown
              movies={movies}
              setFilteredMovies={setFilteredMovies}
              setFilteredCount={setFilteredCount}
              minRating={minRating}
              maxRating={maxRating}
              setMinRating={setMinRating}
              setMaxRating={setMaxRating}
            />
          </div>

          <div className="flex items-center">
            <SortMovies
              sortCriteria={sortCriteria}
              onSortChange={handleSortChange} // Optimized with useCallback
            />
          </div>
        </div>

        <div>
          <p>{filteredCount} movies are currently displayed.</p>
        </div>
      </div>
      <Movies movies={sortedMovies} loading={loading} error={error} />
    </div>
  );
};

export default MovieList;
