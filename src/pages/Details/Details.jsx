import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { getBookDetail } from "../../redux/actions/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./Details.css";
import { TbTruckDelivery } from "react-icons/tb";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const book = useSelector((state) => state.booksDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getBookDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, id]);
  const handlerShowDescription = () => {
    setShowDescription(true);
  };
  const handlerHideDescription = () => {
    setShowDescription(false);
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      {!book.author ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <span></span>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              className="btn btn-primary"
              onClick={handlerShowDescription}
            >
              Description
            </button>
            <button
              className="btn btn-primary"
              onClick={handlerHideDescription}
            >
              More information
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
            {showDescription ? (
              <div className="flex justify-center items-center space-x-4">
                <img src={book.cover} alt={`${book.title} book`} className="w-64 h-auto" />
                <div className="flex flex-col items-center">
                  <h1 className="text-xl text-blue-900 mb-6">{book.title}</h1>
                  <h2 className="text-blue-700 mb-6">{book.author}</h2>
                  <div className="description-container">
                    <h2 className="description text-blue-700">{book.description}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center space-x-4">
                <img src={book.cover} alt={`${book.title} book`} className="w-64 h-auto" />
                <div className="flex flex-col items-center">
                  <h2 className="moreInfo text-blue-700">Publisher: {book.publisher}</h2>
                  <h2 className="moreInfo text-blue-700">Publisher Date: {book.publisher_date}</h2>
                  <h2 className="moreInfo text-blue-700">Pages: {book.pages}</h2>
                  <h2 className="moreInfo text-blue-700">Language: {book.language}</h2>
                </div>
              </div>
            )}
            <div className="price flex flex-col justify-center items-center md:items-start">
              <h1 className="text-4xl text-blue-900 mt-6 mb-3">$ARS {book.price}</h1>
              <span className="text-lg text-blue-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 4a1 1 0 011 1v2h4a1 1 0 010 2h-4v2a1 1 0 11-2 0V9H4a1 1 0 010-2h4V5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Free delivery on orders over 15 USD!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
