import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Searchbar from '../Searchbar';
import MovieList from '../MovieList';
import * as MovieApiServise from '../../servises/MovieApiServise';
import notFound from '../../images/NotFound.jpg';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!query) {
      return;
    }

    MovieApiServise.fetchSearchMovies(query).then(response => {
      if (response) {
        setMovies(response.data.results);
      } else {
        return;
      }
    });
  }, [query]);

  const handleSubmit = value => {
    navigate({ search: `?query=${value}` });
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      {movies &&
        (movies.length ? (
          <MovieList location={location} movies={movies} />
        ) : (
          <img src={notFound} alt="Not Found" />
        ))}
    </>
  );
}
