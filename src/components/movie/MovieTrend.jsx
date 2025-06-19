import { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';

const MovieTrend = () => {
    const [movies, setMovies] = useState([]);

    const fetchTrendMovieData = async () => {
        try {
            const response = await apiClient.get('/movie/trend');
            setMovies(response.data);
        } catch (error) {
            console.error("트렌드 영화 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchTrendMovieData();
    }, []);

    return (
        <section className="bg-dark py-5">
            <div id="movieTrendCarousel" className="carousel slide container px-5" data-bs-ride="carousel">
                <div className="carousel-indicators" id="movie_trend_indicators">
                    {movies.map((movie, index) => (
                        <button
                            key={movie.id}
                            type="button"
                            data-bs-target="#movieTrendCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner" id="movie_trend">
                    {movies.map((movie, index) => (
                        <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row gx-5 align-items-center justify-content-center">
                                <div className="col-lg-8 col-xl-7 col-xxl-6">
                                    <div className="my-5 text-center text-xl-start">
                                        <h1 className="display-5 fw-bolder text-white mb-2">{movie.title}</h1>
                                        <p className="lead fw-normal text-white-50 mb-4" style={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 6
                                        }}>
                                            {movie.overview}
                                        </p>
                                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                            <a className="btn btn-primary btn-lg px-4 me-sm-3" href={`/movie/detail/${movie.id}`}>상세보기</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center" style={{ flex: '0 0 350px', width: '50%' }}>
                                    <img
                                        className="img-fluid rounded-3 my-5"
                                        style={{ height: '400px' }}
                                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                        alt={movie.title}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#movieTrendCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#movieTrendCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    );
};

export default MovieTrend;