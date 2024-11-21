import React, { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import Movies from "./Movies";
import SearchBar from "./SearchBar";
import SortMovies from "./SortMovies";
import RatingDropdown from "./RatingDropdown"; // Use RatingDropdown
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
  const [filteredMovies, setFilteredMovies] = useState([]); // Ensure it's always an array
  const [filteredCount, setFilteredCount] = useState(0); // Track the count of filtered movies
  const [sortCriteria, setSortCriteria] = useState("alphabetical");
  const [minRating, setMinRating] = useState(1); // Track min rating
  const [maxRating, setMaxRating] = useState(10); // Track max rating

  // Initialize filteredMovies with all movies when they are fetched
  useEffect(() => {
    if (Array.isArray(movies)) {
      setFilteredMovies(movies);
    }
  }, [movies]);

  // Handle search input
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredMovies(movies);
  };

  const handleSortChange = (newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  };

  // Sort filteredMovies based on sortCriteria
  const sortedMovies = () => {
    let sorted = [...filteredMovies]; // Copy the array to avoid direct mutation
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
  };

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
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
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
              minRating={minRating} // Pass minRating to RatingDropdown
              maxRating={maxRating} // Pass maxRating to RatingDropdown
              setMinRating={setMinRating} // Pass setMinRating to RatingDropdown
              setMaxRating={setMaxRating} // Pass setMaxRating to RatingDropdown
            />
          </div>

          <div className="flex items-center">
            <SortMovies
              sortCriteria={sortCriteria}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div>
          <p>{filteredCount} movies are currently displayed.</p>
        </div>
      </div>
      <Movies movies={sortedMovies()} loading={loading} error={error} />

      {/* Add the following block to display the rating filter range */}
    </div>
  );
};

export default MovieList;
