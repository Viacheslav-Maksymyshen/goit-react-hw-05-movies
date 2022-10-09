import { useState, useEffect } from 'react';
import * as MovieApiServise from '../../servises/MovieApiServise';
import style from './Reviews.module.css';
import { toast } from 'react-toastify';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    MovieApiServise.fetchReviewsMovie(movieId)
      .then(response => setReviews(response.results))
      .catch(error => toast.error('Error, sorry please'));
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
