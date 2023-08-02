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
      const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjI2YmI5OGFlMGE4ZDg5YTFiM2ZhOWZmNDkxMjExZSIsInN1YiI6IjY0YmUwODlhZWI3OWMyMDBlMjhlMDA4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qi9AycxZsc6sJ5iQpapTpssZOUvnnTEXN30GvsxMl1g';
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

  console.log(selectedMovie);
  //   console.log(searchResults);

  return (
    <div>
      {searchResults.map((movie) => (
        <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} onClick={() => { handleMovieClick(movie) }} />
      ))}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseMovieDetails} />
      )}
      {searchResults.length > 0 ? <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> : <></>}


    </div>
  );
};

export default SearchResults;