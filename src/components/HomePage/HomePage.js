import { useState, useEffect } from 'react';
import * as MovieApiServise from '../../servises/MovieApiServise';
import MovieList from '../../components/MovieList';
import style from './HomePage.module.css';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MovieApiServise.fetchPopularMovies()
      .then(response => setMovies(response.results))
      .catch(error => toast.error('Error, sorry please'));
  }, []);

  return (
    <>
      <div className={style.HomePage}>
        <h2 className={style.Title}>Popular movies today</h2>
        {movies && <MovieList movies={movies} url={'/movies'} />}
      </div>
    </>
  );
}
