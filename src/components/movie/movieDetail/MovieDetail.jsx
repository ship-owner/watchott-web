import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieActor from './MovieActor';
import MovieComment from './MovieComment';
import MovieStreaming from './MovieStreaming';

const MovieDetail = () => {
    const { id } = useParams(); // 영화 ID
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/movie/detail2/${id}`);

                if (!response.ok) {
                    // 401/403 에러 처리 추가
                    if (response.status === 401 || response.status === 403) {
                        throw new Error("영화 상세 정보를 조회할 권한이 없거나 로그인 세션이 만료되었습니다.");
                    }
                    throw new Error(`영화 상세 정보를 불러오는 중 오류 발생: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error("영화 상세 정보를 불러오는 중 오류 발생:", err);
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
                    <p className="text-danger">영화 상세 정보를 불러오지 못했습니다: {error}</p>
                    <p>잠시 후 다시 시도해 주세요.</p>
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

export default MovieDetail;