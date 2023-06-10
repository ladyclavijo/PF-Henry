import "./Filters.css";
import React, { useEffect, useState } from "react";
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

export default function Filters() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.allBooks);
  const [selectSort, setSelectSort] = useState("");
  const [selectPrice, setSelectPrice] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectGenre, setSelectGenre] = useState("");

  const handleSort = (e) => {
    setSelectSort(e.target.value);
    dispatch(sortBy(e.target.value));
    dispatch(getPages(1));
  };

  const handlePrice = (e) => {
    setSelectPrice(e.target.value);
    dispatch(sortBy(e.target.value));
    dispatch(getPages(1));
  };

  const filterBooksByGenres = (e) => {
    const selectedGenre = e.target.value;
    setSelectGenre(selectedGenre);
    dispatch(filterByGenres(selectedGenre));
    dispatch(getPages(1));
  };

  const filterBooksByLanguages = (e) => {
    const selectedLanguage = e.target.value;
    setSelectLanguage(selectedLanguage);
    dispatch(filterByLanguages(selectedLanguage));
    dispatch(getPages(1));
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleClear = () => {
    dispatch(clearFilters(books));
    setSelectSort("");
    setSelectPrice("");
    setSelectGenre("");
    setSelectLanguage("");
    dispatch(getPages(1));
  };

  return (
    <div className="filters-container">
      <div className="filter-section">
        <label>Sort By:</label>
        <select onChange={handleSort} value={selectSort}>
          <option hidden>All</option>
          <option value="ASC">A-Z</option>
          <option value="DES">Z-A</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Price:</label>
        <select onChange={handlePrice} value={selectPrice}>
          <option hidden>All</option>
          <option value="PRI+">HIGHER PRICES</option>
          <option value="PRI-">LESSER PRICES</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Genres:</label>
        <select onChange={filterBooksByGenres} value={selectGenre}>
          <option hidden>All</option>
          <option value="Ficción">Fiction</option>
          <option value="Ciencia">Science</option>
          <option value="Economía">Economy</option>
          <option value="Matemática">Math</option>
          <option value="Criminología">Criminology</option>
          <option value="Biografía">Biography</option>
          <option value="Computación">Computing</option>
          <option value="Historia">History</option>
          <option value="Literatura">Literature</option>
          <option value="Fantasía">Fantasy</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Language:</label>
        <select onChange={filterBooksByLanguages} value={selectLanguage}>
          <option hidden>All</option>
          <option value="es">Spanish</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="clean-div">
        {/* {Object.values(appliedFilters).some((filter) => filter !== null) && ( -------OCULTA EL BOTON AL LIMPIAR LOS FILTROS-------*/}
        <button className="clear-filters-button" onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}