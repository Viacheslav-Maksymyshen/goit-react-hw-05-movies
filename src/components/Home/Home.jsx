import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../Service/Api';
import MovieList from '../MoviList/MovieList';
import style from '../Home/Home.module.css';
// import { Outlet } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(response => setMovies(response.results));
  }, []);

  <>
    <div className={style.HomePage}>
      <h2 className={style.Title}>Popular movies today</h2>

      {movies && <MovieList movies={movies} url={'/movies'} />}
    </div>
  </>;
};

Home.propTypes = {
  // bla: PropTypes.string,
};
