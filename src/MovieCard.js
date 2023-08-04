import React from 'react';

function MovieCard({ movie, setSelectedMovie }) {
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
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
        <div className="moviecard" onClick={() => handleMovieClick(movie)}>
            <img className="image" src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`} alt={movie.title} />
            <div className="infobar">
                <div className='title-section' style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="movie-title">
                        <div className="ring" style={{ width: "38px", height: "38px",color:"black", backgroundColor: getStarColor(movie.vote_average) }}>
                            {/* <div className="ring" style={{ width: "34px", height: "34px", backgroundColor: "black" }}> */}
                                {movie.vote_average.toFixed(1)}
                                {/* </div> */}
                            </div>
                        <div className="title">
                            <div>
                                <h2>{movie.title}</h2>
                            </div>
                            <span className="release_date">{movie.release_date}</span>
                        </div>
                    </div>
                    {true === false ? <button className="card__btn" onClick={() => handleMovieClick(movie)}>
                        <i class="fa fa-plus" />&nbsp;&nbsp;Add to WatchList
                    </button> : <></>}

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
