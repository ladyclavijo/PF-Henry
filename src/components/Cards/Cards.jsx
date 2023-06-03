import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "../../redux/actions/index";
import Card from "../Card/Card.jsx";

export default function Cards() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  // const [actualPage, setActualPage] = useState(1); // para el paginado

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  // console.log(allBooks)

  return (
    <Fragment>
      <div className="allBooks">
        {allBooks.map((book) => {
          return (
            <Card
              id={book.id} // "10273"
              title={book.title} // "Matemática para todos"
              author={book.author} // "Adrián Paenza"
              cover={book.cover} // img URL
              stock={book.stock} // DB info
              genres={book.genres} // Objeto con sus tags/generos
              price={book.price}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
