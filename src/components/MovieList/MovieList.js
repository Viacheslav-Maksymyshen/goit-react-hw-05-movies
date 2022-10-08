import { NavLink } from 'react-router-dom';
import notFoundPoster from '../../images/NotFoundPoster.jpg';
import style from './MovieList.module.css';

export default function MovieList({ movies, location }) {
  return (
    <ul className={style.List}>
      {movies.map(movie => (
        <li key={movie.id} className={style.Item}>
          <NavLink
            className={style.Link}
            to={{ pathname: `/movies/${movie.id}` }}
            state={{ from: location }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://www.themoviedb.org/t/p/w185${movie.poster_path}`
                  : notFoundPoster
              }
              alt={movie.title}
            />
            <p className={style.Title}>{movie.title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
