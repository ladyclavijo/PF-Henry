import "./Home.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { addToCart, getBooks } from "../../redux/actions/index.jsx";
import { getBooks, clearDetail } from "../../redux/actions/index.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import logo from "../../assets/images/Logo.png";
import Filters from "../../components/Filters/Filters";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const { user } = useAuth();
  const [cardsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const allCarts = useSelector((state) => state.allCarts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (allCarts.length > 0 && user) {
    const findCartByUser = allCarts.filter((c) => c.userId === user.uid);
    if (findCartByUser.length > 0) {
      for (let i = 0; i < findCartByUser.length; i++) {
        if (cart.length < 1) {
          dispatch(
            addToCart({
              id: findCartByUser[i].bookId,
              title: findCartByUser[i].title,
              cover: findCartByUser[i].cover,
              price: findCartByUser[i].price,
              quantity: findCartByUser[i].quantity,
            })
          );
        }
      }
    }
  }

  const bookSorted = useSelector((state) => state.bookSorted);
  const currentPages = useSelector((state) => state.paginated);
  const error = useSelector((state) => state.error);

  const lastCardIndex = currentPages * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = bookSorted.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    setLoading(true);
    dispatch(getBooks());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    setNoResults(currentCards.length === 0);
    dispatch(clearDetail());
  }, [currentCards, dispatch]);

  return (
    <div className="home-page">
      <div className="home-navbar">
        <div className="div-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="div-searchbar">
          <SearchBar />
        </div>

        {user ? (
          <div className="div-form">
            <Link to="/form">
              <span>Publish Book</span>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="div-filters">
        <Filters />
      </div>

      <div>
        <NavBar setLoading={setLoading} />
      </div>

      <div className="div-cards">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <Loader />
          ) : currentCards.length > 0 ? (
            currentCards.map((book) => (
              <Card
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                stock={book.stock}
                genres={book.genres}
                price={book.price}
              />
            ))
          ) : (
            <div className="no-results">
              <h2 className="text-red-500 text-4xl mt-11 ml-12 whitespace-nowrap break-words">
                No books match your search.
              </h2>
            </div>
          )}
        </div>
        {!error.length && (
          <Pagination
            cardsPerPage={cardsPerPage}
            bookSorted={bookSorted.length}
          />
        )}
      </div>
    </div>
  );
}
