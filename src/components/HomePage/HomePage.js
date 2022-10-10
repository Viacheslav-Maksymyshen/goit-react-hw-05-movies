import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as MovieApiServise from '../../servises/MovieApiServise';
import MovieList from '../../components/MovieList';
import style from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    MovieApiServise.fetchPopularMovies().then(response => {
      if (response) {
        setMovies(response.data.results);
      } else {
        return;
      }
    });
  }, []);

  return (
    <>
      <div className={style.HomePage}>
        <h2 className={style.Title}>Popular movies today</h2>
        {movies.length && <MovieList movies={movies} url={location} />}
      </div>
    </>
  );
}
