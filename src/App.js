import './App.css';
import React, { useState } from 'react';
import ScrollCards from './ScrollCards';
import Navbar from './Navbar';
import SearchResults from './SearchResults';
import MyWatchlist from './WatchList';
import Home from './HomePage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [home,setHome]=useState(true);

  // const handleMyWatchlistClick = () => {
  //   setShowWatchlist(true);
  // };

  const handleCloseWatchlist = () => {
    setShowWatchlist(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setHome(false);
  };
  const firstsection = [
    { category: 'In Theaters', url: 'https://api.themoviedb.org/3/discover/movie' },
    { category: 'On TV', url: 'https://api.themoviedb.org/3/discover/tv' },
    { category: 'Trending Movies', url: 'https://api.themoviedb.org/3/trending/movie/day ' },
  ];
  const secondsection = [
    { category: 'Top Rated', url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' },
    { category: 'Upcoming', url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' },
  ];

  return (
    <>
      <Navbar setHome={setHome} setShowWatchlist={setShowWatchlist} onSearch={handleSearch} />
      
      {!home && (
        <div>
          <SearchResults query={searchQuery} />
        </div>
      )}
      {showWatchlist && <MyWatchlist onClose={handleCloseWatchlist} />}
      {home && <><Home/><ScrollCards heading={"What's Popular"} selectItems={firstsection} /></>}
      {home && <div style={{backgroundColor:"whitesmoke"}}><ScrollCards style={{backgroundColor:"#333"}} heading={"Movies"} selectItems={secondsection} /></div>}
    </>
  );
}

export default App;
