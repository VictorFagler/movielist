import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa6";

// Styled Components for card and movie elements
const MovieCard = styled.div`
  width: 250px;
  padding: 20px;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
`;

const MovieYear = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 10px;
`;

const MovieDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Rating = styled.p`
  display: flex;
  justify-content: center;
  justify-items: center;
  font-size: 1.1rem;
  color: #e67e22;
  margin-bottom: 15px;
`;

const IMDbLink = styled.a`
  font-size: 0.9rem;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Styled container to wrap movie cards horizontally with wrapping behavior
const MoviesContainer = styled.div`
  justify-content: center;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px; // Optional: Adds spacing between the cards
`;

const Movies = ({ movies, loading, error }) => {
  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MoviesContainer>
      {movies &&
        movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage src={movie.image} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieYear>{movie.year}</MovieYear>
            <Rating>
              Rating: {movie.rating}{" "}
              <FaStar fill="orange" className="mt-1 ml-1" />
            </Rating>
            <MovieDescription>{movie.description}</MovieDescription>
            <IMDbLink
              href={movie.imdb_link}
              target={movie.imdb_link}
              rel="noopener noreferrer"
            >
              View on IMDb
            </IMDbLink>
          </MovieCard>
        ))}
    </MoviesContainer>
  );
};

export default Movies;
