import React, { useState } from 'react';

function Navbar({ onSearch, setShowWatchlist,setHome }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMyWatchlistClick = () => {
    setShowWatchlist(true);
  };

  const handleSearch = () => {
    setHome(false);
    onSearch(searchTerm);
  };

  const handleHome = () => {
    setHome(true);
  };
  return (
    <div className="navbar">
      <div className="navbar_left" onClick={handleHome}>
        <span className="navbar_title" style={{cursor:"pointer"}}>MovieWatchlist</span>
      </div>
      <div className="navbar_middle">
        <input type="text" placeholder="Search movies..." onChange={handleInputChange} />
        <button className="search_button" onClick={handleSearch}>Search</button>
      </div>
      <div className="navbar_right">
        <button className="watchlist_button" onClick={handleMyWatchlistClick}>My Watchlist</button>
      </div>
    </div>
  );
};

export default Navbar;
