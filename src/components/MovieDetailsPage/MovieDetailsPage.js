import { useState, useEffect, Suspense } from 'react';
import {
  Outlet,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as MovieApiServise from '../../servises/MovieApiServise';
import Loader from 'components/Loader';
import notFound from '../../images/NotFound.jpg';
import style from './MovieDetailsPage.module.css';

// const Cast = lazy(() => import('../Cast/Cast'));
// const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    MovieApiServise.fetchDetailsMovie(movieId).then(response => {
      if (response) {
        setMovie(response.data);
      } else {
        return;
      }
    });
  }, [movieId]);

  const onGoBack = () => {
    navigate(location.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button className={style.Button} type="button" onClick={onGoBack}>
            Go Back
          </button>

          <div className={style.MovieDetailsPage}>
            <div className={style.MovieDetails}>
              <div className={style.MovieDetails_img}>
                <img
                  src={
                    movie.poster_path ? (
                      `https://www.themoviedb.org/t/p/w300${movie.poster_path}`
                    ) : (
                      <img src={notFound} alt="Not Found" />
                    )
                  }
                  alt={movie.title}
                />
              </div>
              <div className={style.Information}>
                <h2 className={style.Information_title}>{`${
                  movie.title
                } (${movie.release_date.slice(0, 4)})`}</h2>
                <span>{`User score: ${Math.trunc(
                  movie.vote_average * 10
                )}%`}</span>
                <h2 className={style.Information_title}>Overview:</h2>
                <p>{movie.overview}</p>
                <h2 className={style.Information_title}>Genres:</h2>
                <span>{movie.genres.map(({ name }) => name).join(', ')}</span>
              </div>
            </div>

            <div>
              <h3>Additional information</h3>
              <ul>
                <li className={style.Link}>
                  <NavLink
                    to={`cast`}
                    state={{ from: location.state?.from ?? null }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={style.Link}>
                  <NavLink
                    to={`reviews`}
                    state={{ from: location.state?.from ?? null }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
