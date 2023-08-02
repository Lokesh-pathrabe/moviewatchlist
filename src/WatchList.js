import React,{useState,useEffect} from 'react';

const MyWatchlist = ({ onClose }) => {
  // const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const handleRemoveFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleMarkWatched = (movie) => {
    const updatedWatchlist = watchlist.map((item) => {
      if (item.id === movie.id) {
        return { ...item, watched: true };
      }
      return item;
    });
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className='watchlist-cover'>
      <div className="my-watchlist">
        <div className="close-button" onClick={onClose}>
          <i class="fa fa-times" />
        </div>
        <h2>My Watchlist</h2>
        <div >
          {watchlist.map((movie) => (<>
            <div key={movie.id} className="moviecard">
              <img className="image" src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`} alt={movie.title} />
              <div className="infobar">
                <div className='title-section'>
                  <div className="movie-title">
                    <div className="ring" style={{ width: "38px", height: "38px" }}>{movie.vote_average.toFixed(1)}</div>
                    <div className="title">
                      <div style={{width:"400px",overflow:'hidden',display: "-webkit-box",webkitBoxOrient: "vertical",overflow: "hidden",textOverflow: "ellipsis",webkitLineClamp: "1"}}>
                        <h2>{movie.title}</h2>
                      </div>
                      <span className="release_date">{movie.release_date}</span>
                    </div>
                  </div>
                  <div>
                  {movie.watched ? <span className="watched">Watched</span> : <button className='add-btn' onClick={() => handleMarkWatched(movie)}>Mark Watched</button>}
                  <button onClick={() => { handleRemoveFromWatchlist(movie) }} className="card__btn">
                    <i class="fa fa-trash" />
                  </button>
                  </div>
                </div>
                <div className="overview">
                  <p >{movie.overview}
                  </p>
                </div>
                {/* <button className="card__btn">
                <i class="fa fa-trash"/>&nbsp;&nbsp;Remove from WatchList
                <i class="fa fa-plus"/>&nbsp;&nbsp;Add to WatchList
            </button> */}
              </div>
            </div>
          </>
          ))}
        </div>
        {/* {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseMovieDetails} />
      )} */}
      </div>
    </div>
  );
};

export default MyWatchlist;
