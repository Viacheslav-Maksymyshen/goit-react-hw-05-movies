import { Link } from 'react-router-dom';
import notFoundPoster from '../../images/404.jpg';
import style from './';

export default function MovieList({ movies, url, location }) {
  return (
    <ul className={style.List}>
      {movies.map(movie => (
        <li key={movie.id} className={style.Item}>
          <Link
            className={style.Link}
            to={{ pathname: `${url}/${movie.id}`, state: { from: location } }}
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
