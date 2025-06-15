import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import './MovieLatest.css';
import { apiClient } from '@/utils/apiClient';

const MovieLatest = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

    const fetchLatestMovieData = async () => {
        try {
            const response = await apiClient.get('/api/movie/latest'); 
            setMovies(response.data);
            setSelectedMovieIndex(Math.min(2, response.data.length > 0 ? Math.floor((response.data.length - 1) / 2) : 0));
        } catch (error) {
            console.error("최신 개봉작 데이터를 가져오는 중 오류 발생:", error);
            setMovies([]);
        }
    };

    useEffect(() => {
        fetchLatestMovieData();
    }, []);

    const moveToSelected = useCallback((direction) => {
        if (movies.length === 0) return;

        let newIndex = selectedMovieIndex;
        if (direction === 'next') {
            newIndex = (selectedMovieIndex + 1) % movies.length;
        } else if (direction === 'prev') {
            newIndex = (selectedMovieIndex - 1 + movies.length) % movies.length;
        } else if (typeof direction === 'number') {
            newIndex = direction;
        }
        setSelectedMovieIndex(newIndex);
    }, [movies.length, selectedMovieIndex]);

    const handleCardClick = useCallback((clickedIndex) => {
        if (clickedIndex === selectedMovieIndex) {
            const movieId = movies[clickedIndex].id;
            window.location.href = `/movie/detail/${movieId}`;
        } else {
            moveToSelected(clickedIndex);
        }
    }, [movies, selectedMovieIndex, moveToSelected]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.which) {
                case 37:
                    moveToSelected('prev');
                    break;
                case 39:
                    moveToSelected('next');
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [moveToSelected]);

    const getCardClass = useCallback((index) => {
        const total = movies.length;
        if (total === 0) return 'hide';

        const relativePosition = (index - selectedMovieIndex + total) % total;

        if (relativePosition === 0) return 'selected';
        if (relativePosition === 1) return 'next';
        if (relativePosition === 2) return 'nextRightSecond';

        if (relativePosition === total - 1) return 'prev';
        if (relativePosition === total - 2) return 'prevLeftSecond';

        if (relativePosition === (total - 3 + total) % total) return 'hideLeft';
        if (relativePosition === 3) return 'hideRight';

        return 'hide';
    }, [movies.length, selectedMovieIndex]);


    return (
        <section className="bg-dark py-5">
            <h2 className="fw-bolder" style={{ color: 'white', textAlign: 'center' }}>최신 개봉작</h2>
            <div className="px-5">
                <div id="latest_carousel" className="py-5">
                    {movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className={getCardClass(index)}
                                onClick={() => handleCardClick(index)}
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))
                    ) : (
                        <p className="text-white-50 text-center w-100">최신 개봉작 정보를 불러오는 중입니다...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MovieLatest;