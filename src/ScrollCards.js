import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';

function ScrollCards({ heading, selectItems }) {
  const [movies, setMovies] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(selectItems[0].category);
  const [urllink, setURL] = useState(selectItems[0].url);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleFilterClick = (filterValue, urlValue) => {
    setCurrentFilter(filterValue);
    setURL(urlValue);
  };
  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjI2YmI5OGFlMGE4ZDg5YTFiM2ZhOWZmNDkxMjExZSIsInN1YiI6IjY0YmUwODlhZWI3OWMyMDBlMjhlMDA4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qi9AycxZsc6sJ5iQpapTpssZOUvnnTEXN30GvsxMl1g';
      const apiUrl = urllink;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [urllink]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  const getStarColor = (rating) => {
    if (rating >= 8) {
      return '#4CAF50'; // Green for high ratings (8 and above)
    } else if (rating >= 6) {
      return '#FFC107'; // Yellow for medium ratings (6 to 7.9)
    } else {
      return '#F44336'; // Red for low ratings (below 6)
    }
  };

  return (
    <div className='scrollcard'>
      <div className="section__header">
        <h2>{heading}</h2>
        <div className="ui-group">
          {selectItems.map((i, index) => (
            <button
              key={index}
              className={`button ${currentFilter === `${i.category}` ? 'is-checked' : ''}`}
              onClick={() => handleFilterClick(`${i.category}`, `${i.url}`)}
            >
              {i.category}
            </button>
          ))}
        </div>
      </div>

      {selectItems.map((i, index) => (
        <>
          <div key={index} style={{ display: currentFilter === `${i.category}` ? 'block' : 'none' }}>
            <section >
              <div className="wrapper">
                {movies.map((item) => (
                  <div className="card" onClick={() => handleMovieClick(item)}>
                    <div className="card__body">
                      <img loading='eager' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} class="card__image" alt={item.title} />
                      <p className="card__description"><i style={{ color: getStarColor(item.vote_average) }} class="fa fa-star" /> {item.vote_average}</p>
                      <p className="card__title">{item.original_title || item.original_name}</p>
                      <p className="card__description">{item.release_date || item.first_air_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      ))}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseMovieDetails} />
      )}
    </div>
  )
}

export default ScrollCards;