import "./Home.css";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  addToCart,
  getBooks,
  clearDetail,
  getCartsDB,
} from "../../redux/actions/index.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import logo from "../../assets/images/Logo.png";
import Filters from "../../components/Filters/Filters";
import { useAuth } from "../../context/authContext";
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider";
import Swal from "sweetalert2";
import "../../Styles/colors.css";

export default function Home() {
  const { user } = useAuth();
  const [cardsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const cart = useSelector((state) => state.cart);
  const allBooks = useSelector((state) => state.allBooks);
  const dispatch = useDispatch();
  const [booksLoaded, setBooksLoaded] = useState(false); // Variable de estado para controlar la carga de libros

  useEffect(() => {
    dispatch(getCartsDB());
  }, [dispatch]);

  const allCarts = useSelector((state) => state.allCarts);

  if (allCarts.length > 0 && user && cart.length === 0) {
    const findCartByUser = allCarts.filter((c) => c.userId === user.uid);
    if (findCartByUser.length > 0) {
      findCartByUser.forEach((cartItem) => {
        dispatch(
          addToCart({
            id: cartItem.bookId,
            title: cartItem.title,
            cover: cartItem.cover,
            price: cartItem.price,
            quantity: cartItem.quantity,
            stock: allBooks.find((b) => b.id === cartItem.bookId)?.stock,
          })
        );
      });
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
      setBooksLoaded(true); //Marca que la carga de libros terminó
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    setNoResults(currentCards.length === 0);
    dispatch(clearDetail());
    if (currentCards.length === 0 && !loading && booksLoaded) {
      handleNoResultsAlert();
    }
  }, [currentCards, dispatch, loading, booksLoaded]);

  const { theme } = useContext(ThemeContext); // <--- darkMode

  const styles = {
    container: {
      backgroundColor: "var(--color-background)",
    },
  };

  const handleNoResultsAlert = () => {
    // <--- sweetAlert
    Swal.fire({
      title: "Opss!",
      text: "No books match your search.",
      imageUrl:
        "https://i.pinimg.com/564x/7c/a4/2e/7ca42e4ff366cf7e8ce6b150bfb7b2d9.jpg",
      imageWidth: 300,
      imageHeight: 150,
      imageAlt: "Custom image",
    });
  };

  return (
    <div
      className={"home-page bg-slate-300 min-h-screen"}
      style={styles.container}
    >
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
          ) : null}
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
