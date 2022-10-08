import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={style.Navigation}>
      <NavLink to="/" end className={style.Link}>
        Home
      </NavLink>
      <NavLink to="/movies" className={style.Link}>
        Search Movies
      </NavLink>
    </nav>
  );
}
