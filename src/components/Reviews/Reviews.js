import { useState, useEffect } from 'react';
import * as MovieApiServise from '../../servises/MovieApiServise';
import style from './Reviews.module.css';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    MovieApiServise.fetchReviewsMovie(movieId).then(response => {
      if (response) {
        setReviews(response.data.results);
      } else {
        return;
      }
    });
  }, [movieId]);

  return (
    <>
      {reviews && (
        <div>
          {reviews.length > 0 ? (
            <ul className={style.Link}>
              {reviews.map(({ author, content, id }) => (
                <li key={id}>
                  <h3>Author: {author}</h3>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>We don't have any reviews for this movie.</p>
          )}
        </div>
      )}
    </>
  );
}
