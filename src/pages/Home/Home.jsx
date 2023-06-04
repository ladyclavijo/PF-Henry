import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import Loader from '../../components/Loader/Loader.jsx';
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getBooks } from "../../redux/actions/index.jsx";

export default function Home() {

  const [cardsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const bookSorted = useSelector(state => state.bookSorted);
  const currentPages = useSelector(state => state.paginated);
  const error = useSelector(state => state.error);

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


  return (
    <div className="home-page">
      <div className="div-navBar">
        <NavBar setLoading={setLoading} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Loader />
        ) : (
          currentCards?.map((book, index) => (
            <div className="mx-auto" key={book.id}>
              <Card
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                stock={book.stock}
                genres={book.genres}
                price={book.price}
                className={index % 3 === 2 ? 'last:mb-0' : 'mb-4'}
              />
            </div>

          ))
        )}
      </div>
      {!error.length && (
        <Pagination
          cardsPerPage={cardsPerPage}
          bookSorted={bookSorted.length}
        />
      )}
    </div>

  );
};
