import React from "react";
import styled from "styled-components";

// Styled components for the search bar
const SearchContainer = styled.div`
  position: relative; /* Ensures the button is positioned relative to this container */
  margin: 20px;
`;

const SearchInput = styled.input`
  padding: 10px 30px 10px 10px; /* Extra padding on the right to make space for the "X" */
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px; /* Positions the "X" to the right of the input */
  top: 50%;
  transform: translateY(-50%); /* Centers the "X" vertically */
  padding: 0;
  font-size: 1.2rem;
  background-color: transparent;
  color: firebrick;
  border: none;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && <SearchButton onClick={onClearSearch}>X</SearchButton>}
    </SearchContainer>
  );
};

export default SearchBar;
