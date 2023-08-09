import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [randomBackdrop, setRandomBackdrop] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjI2YmI5OGFlMGE4ZDg5YTFiM2ZhOWZmNDkxMjExZSIsInN1YiI6IjY0YmUwODlhZWI3OWMyMDBlMjhlMDA4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qi9AycxZsc6sJ5iQpapTpssZOUvnnTEXN30GvsxMl1g';
      const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day`;
      try {
        const response = await axios.get(trendingMoviesUrl, {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        });
          const movies = response.data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        setRandomBackdrop(randomMovie.backdrop_path);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchMovies();
    const interval = setInterval(() => {
      fetchMovies();
    }, 30000); // after 30 seconds background change
    return () => clearInterval(interval);
  }, []);
  // console.log(randomBackdrop)

  return (
    <div className="hero-section">
      <div className="hero-background">
        <img
          // src="https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg"
          src={`https://image.tmdb.org/t/p/original/${randomBackdrop}`}
          alt="Hero Background"
        />
      </div>
      <div className="hero-content">
        <h1>Welcome to MovieWatchlist</h1>
        <p>Discover and explore your favorite movies and TV shows.</p>
      </div>
    </div>
  );
};

export default Home;
