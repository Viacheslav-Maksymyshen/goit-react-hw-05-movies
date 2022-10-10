import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '2bbca05b4a0698db2e0a185255a0cc70';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function getData(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    toast.error('Sorry, but there is no information about this movie.');
  }
}

export function fetchPopularMovies(currentPage = 1) {
  const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${currentPage}`;
  return getData(url);
}

export function fetchSearchMovies(query, currentPage = 1) {
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${currentPage}&include_adult=false`;
  return getData(url);
}

export function fetchDetailsMovie(movieId) {
  const url = `${BASE_URL}movie/${movieId}?&api_key=${API_KEY}&language=en-US`;
  return getData(url);
}

export function fetchCastMovie(movieId) {
  const url = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  return getData(url);
}

export function fetchReviewsMovie(movieId) {
  const url = `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  return getData(url);
}
