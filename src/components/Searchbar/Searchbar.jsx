import { useState } from 'react';
import css from './Searchbar.module.css';
import { TbSearch } from 'react-icons/tb';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleSearchFild = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      return toast.error('Enter search name !');
    }

    onSubmit(searchName);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <TbSearch className={css.SearchFormImage} />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleSearchFild}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
