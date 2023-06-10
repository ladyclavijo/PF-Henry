import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getBooksByName } from "../../redux/actions";
import './SearchBar.css';

export default function SearchBar() {
  const [books, setBooks] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault();
    if (!books || books === '') {
      setError(true);
      return;
    }
    setError(false);
    dispatch(getBooksByName(books));

  };
  const onChangeInput = e => {
    setBooks(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." onChange={onChangeInput} name="name" value={books} className={error ? 'error' : ''} />
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};
