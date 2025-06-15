import React from 'react';

const MovieActor = ({ actorList }) => {
    const getProfileImageUrl = (profilePath) => {
        return profilePath
            ? `https://image.tmdb.org/t/p/w500${profilePath}`
            : 'https://via.placeholder.com/50x50?text=No+Image';
    };

    return (
        <div className="col-lg-3">
            {actorList && actorList.length > 0 ? (
                actorList.map((person, index) => (
                    <div key={index} className="d-flex align-items-center mt-lg-5 mb-4">
                        <img
                            className="img-fluid rounded-circle"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            src={getProfileImageUrl(person.profilePath)}
                            alt={person.name}
                        />
                        <div className="ms-3">
                            <div className="fw-bold">{person.name}</div>
                            <div className="text-muted">{person.character}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted mt-lg-5">캐스팅 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default MovieActor;