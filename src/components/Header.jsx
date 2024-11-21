import React from "react";
import SearchBar from "./SearchBar"; // Make sure SearchBar is imported
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

const Header = ({ searchQuery, onSearchChange, onClearSearch, setFetchEnabled }) => {
  return (
    <div id="header" className="flex justify-between items-center px-8 bg-gray-200">
      <h2 className="flex font-bold p-6 text-4xl">Top 100 Movies</h2>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
      />
      <div>
        <ButtonContainer>
          <StyledButton onClick={() => setFetchEnabled(false)}>Stop Fetching</StyledButton>
        </ButtonContainer>

        <ButtonContainer>
          <StyledButton onClick={() => setFetchEnabled(true)}>Start Fetching</StyledButton>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default Header;
