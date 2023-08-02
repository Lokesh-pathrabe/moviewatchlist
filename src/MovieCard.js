import React from 'react';

function MovieCard({movie,setSelectedMovie}){
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
      };
  return (
    <div className="moviecard" onClick={() => handleMovieClick(movie)}>
        <img className="image" src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`} alt={movie.title}/>
        <div className="infobar">
            <div className='title-section' style={{display:"flex",justifyContent:"space-between"}}>
                <div className="movie-title">
                    <div className="ring" style={{width:"38px",height:"38px"}}>{movie.vote_average.toFixed(1)}</div>
                    <div className="title">
                    <div>
                        <h2>{movie.title}</h2>
                    </div>
                    <span className="release_date">{movie.release_date}</span>
                    </div>
                </div>
                {true===false? <button className="card__btn" onClick={() => handleMovieClick(movie)}>
                    <i class="fa fa-plus"/>&nbsp;&nbsp;Add to WatchList
                </button>:<></>}
                
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
  );
};

export default MovieCard;
