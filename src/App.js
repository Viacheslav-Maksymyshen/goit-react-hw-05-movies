import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'components/Loader';
import Navigation from './components/Navigation';
import Container from './components/Container/Container';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));

export default function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
