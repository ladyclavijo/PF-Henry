import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Cards from "../../components/Cards/Cards.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getBooks } from "../../redux/actions/index.jsx";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks);
  }, [dispatch]);
  const allBooks = useSelector((state) => state.allBooks);
  return (
    <div>Home
      <NavBar></NavBar>
      <Filters></Filters>
      <Cards allBooks={allBooks}></Cards>
      <Pagination></Pagination>
    </div>
  );
}
