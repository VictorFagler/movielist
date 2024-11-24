import React from "react";
import styled from "styled-components";


const SelectField = styled.select`
  padding: 4px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  width: 180px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SortMovies = ({ sortCriteria, onSortChange }) => {
  const handleSortChange = (event) => {
    onSortChange(event.target.value); // Update the sorting criteria when changed
  };

  return (
    <div>
      <SelectField
        id="sort-options"
        value={sortCriteria}
        onChange={handleSortChange}
      >
        <option value="alphabetical">Sort Alphabetically</option>
        <option value="rating">Sort by Rating</option>
        <option value="release_date">Sort by Release Date</option>
      </SelectField>
    </div>
  );
};

export default SortMovies;
