import React, { useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { filterByGenres,getPages,sortBy,getAllGenres,getBooks, filterByLanguages } from "../../redux/actions";
import 'Filter.css';

export default function Filters() {
 const dispatch = useDispatch();
 const books = useSelector(state => state.allBooks);

 const handleSort = e => {
  dispatch(sortBy(e.target.value, books));
  dispatch(getPages(1));
 };

 const filterBooksByGenres = e => {
  dispatch(filterByGenres(e.target.value,books));
  dispatch(getPages(1));
 };

 const filterBooksByLanguages = e => {
  dispatch(filterByLanguages(e.target.value,books));
  dispatch(getPages(1));
 }

 useEffect(() => {
  dispatch(getAllGenres());
 },[dispatch]);

 const handleClear = () => {
  dispatch(getBooks());
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
      <option value="Genres">Genres</option>
      <option value="Fiction">Fiction</option>
      <option value="Science">Science</option>
      <option value="Economy">Economy</option>
      <option value="Math">Math</option>
      <option value="Criminology">Criminology</option>
      <option value="Biography">Biography</option>
      <option value="computing">computing</option>
    </select>

    <select onChange={filterBooksByLanguages}>
      <option value="All">Language</option>
      <option value="es">Spanish</option>
      <option value="en">English</option>
    </select>

    <button onClick={handleClear}>Clear Filters</button>
  </div>
 )
};
