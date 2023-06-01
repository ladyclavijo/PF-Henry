import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getBookDetail} from "../../redux/actions/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const book = useSelector((state) => state.booksDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getBookDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
        <div>
          <Link to="/home">
            <div>
              <span> Back To Home </span>
            </div>
          </Link>
          <img src={book.cover} alt={`${book.title} book`} />
          <h1>{book.title}</h1>
          <div>
            <h2>Author: {book.author}</h2>
            <h2>Description: {book.description}</h2>
            <h2>Price: {book.price}</h2>
            <h2>Publisher: {book.publisher}</h2>
            <h2>Publisher Date: {book.publisher_date}</h2>
            <h2>Pages: {book.pages}</h2>
            <h2>Language: {book.language}</h2>
          </div>
        </div>
        </>
      )};
    </div>
  );
}
