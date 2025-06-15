import React from 'react';
import MovieTrend from '../components/movie/MovieTrend';
import MovieLatest from '../components/movie/MovieLatest';

const HomePage = () => {
  return (
    <>
        <MovieTrend />
        <MovieLatest />
    </>
  );
};

export default HomePage;