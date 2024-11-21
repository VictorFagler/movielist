import React from "react";
import useFetchData from "../hooks/useFetchData"; // Import the custom hook
import Movies from "./Movies"; // Import Movies component
import styled from "styled-components";

// Styled components for buttons and tooltip
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
    transform: scale(1.05); /* Optional: adds a scaling effect on hover */
  }

  &:active {
    background-color: #1f6c91;
  }

  &:focus {
    outline: none;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  top: 100%; /* Position the tooltip above the button */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ButtonContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const MovieList = () => {
  const { movies, loading, error, setFetchEnabled } = useFetchData(); // Get data from the custom hook

  // Disable fetch when styling
  const handleStopFetching = () => {
    setFetchEnabled(false);
  };

  // Enable fetch again when needed
  const handleStartFetching = () => {
    setFetchEnabled(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 bg-gray-200">
        <div>
          <h2 className="flex justify-center font-bold p-6 text-4xl">
            Top 100 Movies
          </h2>
        </div>
        <div>
          <ButtonContainer>
            <StyledButton onClick={handleStopFetching}>
              Stop Fetching
            </StyledButton>
            <Tooltip>Stops the movie fetch</Tooltip>
          </ButtonContainer>
          <ButtonContainer>
            <StyledButton onClick={handleStartFetching}>
              Start Fetching
            </StyledButton>
            <Tooltip>Starts the movie fetch</Tooltip>
          </ButtonContainer>
        </div>
      </div>
      <div>
        <Movies movies={movies} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default MovieList;
