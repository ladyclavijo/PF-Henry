import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { getBookDetail } from "../../redux/actions/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./Details.css";
import { useAuth } from "../../context/authContext"
import { TbTruckDelivery } from "react-icons/tb";


export default function Details() {
  const { id } = useParams();
  const { user } = useAuth();
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
    <div>
      <NavBar />
      {!book.author ? (
        <Loader />
      ) : (
        <>
          <div>
            <div>
              <span> </span>
            </div>
            <div className="buttons">
              <button onClick={handlerShowDescription}>Description</button>
              <button onClick={handlerHideDescription}>More information</button>
            </div>
            <div className="body">
              {showDescription ? (
                <div className="conteiner1">
                  <img src={book.cover} alt={`${book.title} book`} />
                  <div className="conteinerInfo">
                    <h1>{book.title}</h1>
                    <h2 className="author">{book.author}</h2>
                    <h2 className="description"> {book.description}</h2>
                  </div>
                </div>
              ) : (
                <div className="conteiner1">
                  <img src={book.cover} alt={`${book.title} book`} />
                  <div className="conteinerInfo">
                    <h2 className="moreInfo">Publisher: {book.publisher}</h2>
                    <h2 className="moreInfo">
                      Publisher Date: {book.publisher_date}
                    </h2>
                    <h2 className="moreInfo">Pages: {book.pages}</h2>
                    <h2 className="moreInfo">Language: {book.language}</h2>

                    {book.genres.length === 1 ? (
                      <h2 className="moreInfo">Genre: {book.genres[0].name}</h2>
                    ) : (
                      <h2 className="moreInfo">
                        Genres:{" "}
                        {`${book.genres[0].name}, ${book.genres[1].name}`}
                      </h2>
                    )}
                    <h2 className="moreInfo">Stock: {book.stock}</h2>
                  </div>
                </div>
              )}
              <div className="price">
                <h1>${book.price}</h1>
                <div className="delivery-container">
                  <span>
                    <TbTruckDelivery className="icon" /> Free delivery on orders
                    over $15!
                  </span>
                  
                  {user ? (
                  <>
                    <button className="Add-to-cart">Add to cart</button>
                    <Link to={"/buy"}>
                      <button className="Buy-it">Buy it</button>
                    </Link> 
                  </>)
                  : (
                  <> 
                    <Link to={"/login"}>
                      <button className="Add-to-cart">Add to cart</button>
                    </Link> 
                    <Link to={"/login"}>
                      <button className="Buy-it">Buy it</button>
                    </Link> 
                  </> 
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}