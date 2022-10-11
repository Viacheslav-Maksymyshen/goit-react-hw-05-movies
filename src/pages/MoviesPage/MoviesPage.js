import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';
import MovieList from '../../components/MovieList';
import * as MovieApiServise from '../../servises/MovieApiServise';
import notFound from '../../images/NotFound.jpg';
import { toast } from 'react-toastify';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryParam = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!queryParam) {
      return;
    }

    MovieApiServise.fetchSearchMovies(queryParam).then(response => {
      if (response.data.results.length > 0) {
        setMovies(response.data.results);
      } else {
        setMovies([]);
        return toast.info(
          `Sorry, but nothing was found for the search query "${queryParam}"`
        );
      }
    });
  }, [queryParam]);

  const changeQuery = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  return (
    <>
      <Searchbar onSubmit={changeQuery} value={queryParam} />

      {movies &&
        (movies.length ? (
          <MovieList location={location} movies={movies} />
        ) : (
          <img src={notFound} alt="Not Found" />
        ))}
    </>
  );
}
