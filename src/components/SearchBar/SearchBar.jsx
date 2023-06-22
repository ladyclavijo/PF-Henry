import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  getBooksByAuthor,
  getBooksByName,
  getPages,
} from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const allBooks = useSelector((state) => state.allBooks);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const authors = allBooks.map((b) => b.author[0]);
  const allAuthors = [...new Set(authors)];

  const handleSearch = (e) => {
    e.preventDefault();
    const findAuthor = allAuthors.filter((a) =>
      a.toLowerCase().includes(input.toLowerCase())
    );
    if (!input || input === "") {
      setError(true);
      return;
    } else if (findAuthor.length) {
      setError(false);
      dispatch(getBooksByAuthor(input));
      dispatch(getPages(1));
    } else {
      console.log("hola");
      setError(false);
      dispatch(getBooksByName(input));
      dispatch(getPages(1));
    }
  };

  const onChangeInput = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue.trim() === "") {
      dispatch(clearFilters(allBooks));
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          onChange={onChangeInput}
          name="name"
          value={input}
          className={error ? "error" : ""}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}