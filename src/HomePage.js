// Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-background">
        <img
          src="https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg"
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
