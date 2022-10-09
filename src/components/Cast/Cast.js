import { useState, useEffect } from 'react';
import * as MovieApiServise from '../../servises/MovieApiServise';
import notFoundPoster from '../../images/NotFoundPoster.jpg';
import style from './Cast.module.css';
import { toast } from 'react-toastify';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    MovieApiServise.fetchCastMovie(movieId)
      .then(response => setCast(response.cast))
      .catch(error => toast.error('Error, sorry please'));
  }, [movieId]);

  return (
    <>
      {cast && (
        <div className={style.Cast}>
          {cast.map(({ cast_id, character, name, profile_path }) => (
            <li key={cast_id} className={style.Item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : notFoundPoster
                }
                alt={name}
              />

              <h3 className={style.Title}>{name}</h3>
              <p>Character: {character}</p>
            </li>
          ))}
        </div>
      )}
    </>
  );
}
