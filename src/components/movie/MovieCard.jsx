import React from 'react';

const MovieCard = ({ movie }) => {
    if (!movie) {
        return null;
    }

    const imageUrl = movie.posterPath
        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    const voteAverage = movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A';

    return (
        <div className="profile-card-6">
            <div style={{ display: 'block', height: '100%', textDecoration: 'none', cursor: 'pointer' }}>
                <img src={imageUrl} alt={movie.title} />
                <div className="profile-name">{movie.title}</div>
                <div className="profile-overview">
                    <div className="row text-center">
                        <div className="col-xs-4">
                            <p>평점</p>
                            <h3>{voteAverage}</h3>
                        </div>
                        <div className="col-xs-4">
                            <p>개봉일</p>
                            <h3>{movie.releaseDate}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;