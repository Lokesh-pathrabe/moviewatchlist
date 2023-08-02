import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import MovieDetails from './MovieDetails';

const SearchResults = ({ query }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async (page) => {
      const api_key = 'YOUR_API_KEY'; // Replace with your actual API key
      const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        });

        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchMovies(currentPage);
  }, [query, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  const resultsPerPage = 10;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = searchResults.slice(startIndex, endIndex);

  return (
    <div>
      {currentResults.map((movie) => (
        <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} onClick={() => { handleMovieClick(movie) }} />
      ))}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseMovieDetails} />
      )}
      {searchResults.length > 0 ? (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResults;
