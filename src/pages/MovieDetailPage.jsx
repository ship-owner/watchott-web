import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieActor from '../components/movie/movieDetail/MovieActor';
import MovieComment from '../components/movie/movieDetail/MovieComment';
import MovieStreaming from '../components/movie/movieDetail/MovieStreaming';

import { apiClient } from '@/utils/apiClient';

const MovieDetailPage = () => {
    const { id } = useParams(); // 영화 ID
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiClient.get(`/api/movie/detail/${id}`);
                setMovie(response.data);
            } catch (err) {
                setError(err.message);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    // 포스터 이미지 URL 헬퍼 함수
    const getPosterImageUrl = (posterPath) => {
        return posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : 'https://via.placeholder.com/500x750?text=No+Image';
    };

    if (loading) {
        return (
            <section className="py-5 bg-dark text-white" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <div className="container px-5 my-5">
                    <p>영화 상세 정보를 로딩 중입니다...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-5 bg-dark text-white" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <div className="container px-5 my-5">
                    <p className="text-danger">{error}</p>
                </div>
            </section>
        );
    }

    if (!movie) {
        return (
            <section className="py-5 bg-dark text-white" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <div className="container px-5 my-5">
                    <p>해당 영화 정보를 찾을 수 없습니다.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <MovieActor actorList={movie.actorList} />

                    <div className="col-lg-9">
                        <article>
                            <header className="mb-4">
                                <input id="movieId" type="hidden" value={movie.id} readOnly />
                                <h1 className="fw-bolder mb-1">{movie.title}</h1>
                                <div className="text-muted fst-italic mb-2">{movie.releaseDate}</div>

                                <MovieStreaming
                                    flatrateList={movie.flatrateList}
                                    rentList={movie.rentList}
                                    buyList={movie.buyList}
                                />
                            </header>
                            <figure className="mb-4">
                                <img
                                    className="img-fluid rounded"
                                    src={getPosterImageUrl(movie.posterPath)}
                                    alt={movie.title}
                                />
                            </figure>
                            <section className="mb-5">
                                <p className="fs-5 mb-4">{movie.overview}</p>
                            </section>
                        </article>

                        <section id="comments">
                            <MovieComment movieId={movie.id} />
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailPage;