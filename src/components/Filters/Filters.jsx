import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenres,
  getPages,
  sortBy,
  getAllGenres,
  getBooks,
  filterByLanguages,
  clearFilters,
} from "../../redux/actions";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.allBooks);
  const appliedFilters = useSelector((state) => state.appliedFilters);

  const handleSort = (e) => {
    dispatch(sortBy(e.target.value));
    dispatch(getPages(1));
  };

  const filterBooksByGenres = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === "All") {
      dispatch(clearFilters(books));
    } else {
      dispatch(filterByGenres(selectedGenre));
    }
    dispatch(getPages(1));
  };

  const filterBooksByLanguages = (e) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage === "All") {
      dispatch(clearFilters(books));
    }
    dispatch(filterByLanguages(selectedLanguage));
    dispatch(getPages(1));
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleClear = () => {
    dispatch(clearFilters(books));
    dispatch(getPages(1));
  };

  return (
    <div>
      <select onChange={handleSort}>
        <option value="All">Sort By</option>
        <option value="ASC">A-Z</option>
        <option value="DES">Z-A</option>
      </select>

      <select onChange={handleSort}>
        <option value="All">Price</option>
        <option value="PRI+">HIGHER PRICES</option>
        <option value="PRI-">LESSER PRICES</option>
      </select>

      <select onChange={filterBooksByGenres}>
        <option value="All">Genres</option>
        <option value="Ficción">Fiction</option>
        <option value="Ciencia">Science</option>
        <option value="Economía">Economy</option>
        <option value="Matemática">Math</option>
        <option value="Criminología">Criminology</option>
        <option value="Biografía">Biography</option>
        <option value="Computación">Computing</option>
        <option value="Historia">History</option>
      </select>

      <select onChange={filterBooksByLanguages}>
        <option value="All">Language</option>
        <option value="es">Spanish</option>
        <option value="en">English</option>
      </select>

      {Object.values(appliedFilters).some((filter) => filter !== null) && (
        <button onClick={handleClear}>Clear Filters</button>
      )}
    </div>
  );
}
