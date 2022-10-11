import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import style from './Searchbar.module.css';

export default function Searchbar({ onSubmit, value }) {
  const [searchQuery, setSearchQuery] = useState(value);

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Please enter a search query');
    }
    onSubmit(searchQuery.trim().toLowerCase());
  };

  return (
    <div className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button className={style.SearchForm_button} type="submit">
          <span>
            <ImSearch />
            <span className={style.SearchImg}>Search</span>
          </span>
        </button>

        <input
          className={style.SearchForm_input}
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleNameChange}
        />
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
