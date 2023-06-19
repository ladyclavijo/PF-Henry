import "./Filters.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenres,
  getPages,
  sortBy,
  getAllGenres,
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
        <label>Genres:</label>
        <select onChange={filterBooksByGenres} value={selectGenre}>
          <option hidden>All</option>
          <option value="Ficción">Fiction</option>
          <option value="No Ficción">Non-fiction</option>
          <option value="Misterio">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Ciencia Ficción">Science fiction</option>
          <option value="Fantasía">Fantasy</option>
          <option value="Terror">Horror</option>
          <option value="Aventura">Adventure</option>
          <option value="Policial">Crime</option>
          <option value="Suspenso">Suspense</option>
          <option value="Drama">Drama</option>
          <option value="Poesía">Poetry</option>
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


      <div className="clean-div">
        {/* {Object.values(appliedFilters).some((filter) => filter !== null) && ( -------OCULTA EL BOTON AL LIMPIAR LOS FILTROS-------*/}
        <button className="clear-filters-button" onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
