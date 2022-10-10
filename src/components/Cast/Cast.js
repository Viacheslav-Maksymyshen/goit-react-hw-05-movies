import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MovieApiServise from '../../servises/MovieApiServise';
import notFoundPoster from '../../images/NotFoundPoster.jpg';
import style from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    MovieApiServise.fetchCastMovie(movieId).then(response => {
      if (response) {
        setCast(response.data.cast);
      } else {
        return;
      }
    });
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
