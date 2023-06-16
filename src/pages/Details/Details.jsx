// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import NavBar from '../../components/NavBar/NavBar.jsx';
// import { getBookDetail } from '../../redux/actions/index.jsx';
// import Loader from '../../components/Loader/Loader.jsx';
// import './Details.css';
// import { useAuth } from '../../context/authContext';
// import { TbTruckDelivery } from 'react-icons/tb';
// import { addToCart } from '../../redux/actions/index.jsx';
// import axios from 'axios';

// export default function Details() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [showDescription, setShowDescription] = useState(true);
//   const book = useSelector((state) => state.booksDetail);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [stock, setStock] = useState(book.stock);
//   const [selectedQuantity, setSelectedQuantity] = useState(quantity);
//   const cart = useSelector((state) => state.cart);
//   const [comment, setComment] = useState('');
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     dispatch(getBookDetail(id));
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, [dispatch, id]);

//   const handlerShowDescription = () => {
//     setShowDescription(true);
//   };

//   const handlerHideDescription = () => {
//     setShowDescription(false);
//   };

//   const handleBuyClick = () => {
//     const bookData = {
//       id: book.id,
//       title: book.title,
//       cover: book.cover,
//       price: book.price,
//       quantity: quantity,
//     };
//     console.log(bookData);
//     navigate('/buy', { state: bookData });
//   };

//   const handleAddToCart = () => {
//     const cartData = {
//       id: book.id,
//       title: book.title,
//       cover: book.cover,
//       price: book.price,
//       quantity: quantity,
//     };

//     const itemInCart = cart.find((item) => item.id === book.id);
//     const quantityInCart = itemInCart ? itemInCart.quantity : 0;
//     const remainingStock = stock - quantityInCart;

//     if (remainingStock >= quantity) {
//       dispatch(addToCart(cartData));
//       alert('Successfully added to cart');
//     } else {
//       alert(`Cannot add ${quantity} items to cart. Only ${remainingStock} items available.
//       You already have ${quantityInCart} items in your cart.`);
//     }
//   };

//   const handleAddReview = () => {
//     const reviewData = {
//       bookId: book.id,
//       comment: comment,
//       rating: rating,
//       userId: user.id, // Asegúrate de obtener el ID del usuario actual
//     };

//     saveReview(reviewData)
//       .then((response) => {
//         // Actualiza la lista de reseñas mostrada en el frontend si es necesario
//         saveReview([...reviews, response.review]);
//         // Limpia los campos de comentario y calificación
//         setComment('');
//         setRating(0);
//       })
//       .catch((error) => {
//         console.error(error);
//         // Maneja el error en caso de fallo en la solicitud
//       });
//   };

//   const saveReview = async (reviewData) => {
//     try {
//       const response = await axios.post('/api/reviews', reviewData);
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error('Error al guardar la reseña');
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       {!book.author ? (
//         <Loader />
//       ) : (
//         <>
//           <div>
//             <div>
//               <span> </span>
//             </div>
//             <div className="buttons">
//               <button onClick={handlerShowDescription}>Description</button>
//               <button onClick={handlerHideDescription}>More information</button>
//             </div>
//             <div className="body">
//               {showDescription ? (
//                 <div className="conteiner1">
//                   <img src={book.cover} alt={`${book.title} book`} />
//                   <div className="conteinerInfo">
//                     <h1>{book.title}</h1>
//                     <h2 className="author">{book.author}</h2>
//                     <h2 className="description"> {book.description}</h2>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="conteiner1">
//                   <img src={book.cover} alt={`${book.title} book`} />
//                   <div className="conteinerInfo">
//                     <h2 className="moreInfo">Publisher: {book.publisher}</h2>
//                     <h2 className="moreInfo">
//                       Publisher Date: {book.publisher_date}
//                     </h2>
//                     <h2 className="moreInfo">Pages: {book.pages}</h2>
//                     <h2 className="moreInfo">Language: {book.language}</h2>

//                     {book.genres.length === 1 ? (
//                       <h2 className="moreInfo">Genre: {book.genres[0].name}</h2>
//                     ) : (
//                       <h2 className="moreInfo">
//                         Genres: {`${book.genres[0].name}, ${book.genres[1].name}`}
//                       </h2>
//                     )}
//                   </div>
//                 </div>
//               )}
//               <div className="price">
//                 <h1>${book.price}</h1>
//                 <div className="delivery-container">
//                   <span>
//                     <TbTruckDelivery className="icon" /> Free delivery on orders over $15!
//                   </span>
//                   {user ? (
//                     <>
//                       <div className="quantity-select">
//                         <label htmlFor="quantity">Quantity:</label>
//                         <select
//                           id="quantity"
//                           value={quantity}
//                           onChange={(e) => setQuantity(parseInt(e.target.value))}
//                         >
//                           {Array.from({ length: book.stock }, (_, index) => index + 1).map((num) => (
//                             <option key={num} value={num}>{num}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <button
//                         className="Add-to-cart"
//                         onClick={handleAddToCart}
//                         disabled={stock === 0 || selectedQuantity > stock}
//                       >
//                         Add To Cart
//                       </button>
//                       <h4 className="stock">Stock: {book.stock}</h4>
//                       <button className="Buy-it" onClick={handleBuyClick}>
//                         Buy it
//                       </button>
//                       <input
//                         type="text"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         placeholder="Escribe tu comentario"
//                       />
//                       <select
//                         value={rating}
//                         onChange={(e) => setRating(parseInt(e.target.value))}
//                       >
//                         <option value="1">1 estrella</option>
//                         <option value="2">2 estrellas</option>
//                         <option value="3">3 estrellas</option>
//                         <option value="4">4 estrellas</option>
//                         <option value="5">5 estrellas</option>
//                       </select>
//                       <button onClick={handleAddReview}>Enviar</button>

//                     </>
//                   ) : (
//                     <>
//                       <Link to="/login">
//                         <button className="Add-to-cart">Add To Cart</button>
//                       </Link>
//                       <Link to="/login">
//                         <button className="Buy-it">Buy it</button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getBookDetail,
  postCarts,
  updateCarts,
} from "../../redux/actions/index.jsx";
import { useAuth } from "../../context/authContext";
import { addToCart } from "../../redux/actions/index.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { TbTruckDelivery } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const book = useSelector((state) => state.booksDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(book.stock);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const cart = useSelector((state) => state.cart);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const allCarts = useSelector((state) => state.allCarts);

  useEffect(() => {
    setLoading(true);
    dispatch(getBookDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, id]);

  useEffect(() => {
    if (book.reviews) {
      setReviews(book.reviews);
    }
  }, [book]);

  const handlerShowDescription = () => {
    setShowDescription(true);
  };

  const handlerHideDescription = () => {
    setShowDescription(false);
  };

  const handleBuyClick = () => {
    const bookData = {
      id: book.id,
      title: book.title,
      cover: book.cover,
      price: book.price,
      quantity: quantity,
    };
    console.log(bookData);
    navigate("/buy", { state: bookData });
  };

  const handleAddToCart = () => {
    if (allCarts.length > 0) {
      const findCartWithUserAndBook = allCarts.filter(
        (c) => c.userId === user.uid && c.bookId === book.id
      );
      if (findCartWithUserAndBook.length > 0) {
        console.log(findCartWithUserAndBook);
        console.log(findCartWithUserAndBook[0].quantity);
        console.log(quantity);
        dispatch(
          updateCarts({
            quantity: quantity + findCartWithUserAndBook[0].quantity,
            userId: user.uid,
            bookId: book.id,
          })
        );
        const cartData = {
          id: book.id,
          title: book.title,
          cover: book.cover,
          price: book.price,
          quantity: quantity,
        };

        const itemInCart = cart.find((item) => item.id === book.id);
        const quantityInCart = itemInCart ? itemInCart.quantity : 0;
        const remainingStock = stock - quantityInCart;

        if (remainingStock >= quantity) {
          dispatch(addToCart(cartData));
          alert("Successfully added to cart");
        } else {
          alert(`Cannot add ${quantity} items to cart. Only ${remainingStock} items available.
          You already have ${quantityInCart} items in your cart.`);
        }
      } else {
        dispatch(
          postCarts({
            title: book.title,
            cover: book.cover,
            price: book.price,
            quantity: quantity,
            userId: user.uid,
            bookId: book.id,
          })
        );
        const cartData = {
          id: book.id,
          title: book.title,
          cover: book.cover,
          price: book.price,
          quantity: quantity,
        };

        const itemInCart = cart.find((item) => item.id === book.id);
        const quantityInCart = itemInCart ? itemInCart.quantity : 0;
        const remainingStock = stock - quantityInCart;

        if (remainingStock >= quantity) {
          dispatch(addToCart(cartData));
          alert("Successfully added to cart");
        } else {
          alert(`Cannot add ${quantity} items to cart. Only ${remainingStock} items available.
          You already have ${quantityInCart} items in your cart.`);
        }
      }
    } else {
      dispatch(
        postCarts({
          title: book.title,
          cover: book.cover,
          price: book.price,
          quantity: quantity,
          userId: user.uid,
          bookId: book.id,
        })
      );
      const cartData = {
        id: book.id,
        title: book.title,
        cover: book.cover,
        price: book.price,
        quantity: quantity,
      };

      const itemInCart = cart.find((item) => item.id === book.id);
      const quantityInCart = itemInCart ? itemInCart.quantity : 0;
      const remainingStock = stock - quantityInCart;

      if (remainingStock >= quantity) {
        dispatch(addToCart(cartData));
        alert("Successfully added to cart");
      } else {
        alert(`Cannot add ${quantity} items to cart. Only ${remainingStock} items available.
        You already have ${quantityInCart} items in your cart.`);
      }
    }
  };

  const handleAddReview = () => {
    const reviewData = {
      bookId: book.id,
      comment: comment,
      rating: rating,
      userId: user.id,
    };

    saveReview(reviewData)
      .then((response) => {
        // Actualiza la lista de reseñas mostrada en el frontend si es necesario
        setReviews([...reviews, response.review]);
        // Limpia los campos de comentario y calificación
        setComment("");
        setRating(0);
      })
      .catch((error) => {
        console.error(error);
        // Maneja el error en caso de fallo en la solicitud
      });
  };

  const saveReview = async (reviewData) => {
    try {
      const response = await axios.post("/api/reviews", reviewData);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error al guardar la reseña");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleMouseEnter = (value) => {
    setRating(value);
  };

  const handleClick = (value) => {
    setRating(value);
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
                      <div className="quantity-select">
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                          id="quantity"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                        >
                          {Array.from(
                            { length: book.stock },
                            (_, index) => index + 1
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="Add-to-cart"
                        onClick={handleAddToCart}
                        disabled={stock === 0 || selectedQuantity > stock}
                      >
                        Add To Cart
                      </button>
                      <h4 className="stock">Stock: {book.stock}</h4>
                      <button className="Buy-it" onClick={handleBuyClick}>
                        Buy it
                      </button>
                      <div className="reviews">
                        <h3>Add a Review:</h3>
                        <textarea
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write your comment"
                          className="comment"
                        />

                        <h2>Rating: {rating} estrellas</h2>
                        <div className="rating-container">
                          {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                              <FaStar
                                key={index}
                                className="star"
                                color={
                                  starValue <= rating ? "#ffc107" : "#e4e5e9"
                                }
                                onMouseEnter={() => handleMouseEnter(starValue)}
                                onClick={() => handleClick(starValue)}
                              />
                            );
                          })}
                        </div>
                        <br />
                        <button onClick={handleAddReview}>Submit</button>
                        <h2>Reviews</h2>
                        {reviews.map((review) => (
                          <div key={review.id}>
                            <h3>User: {review.user}</h3>
                            <p>Comment: {review.comment}</p>
                            <p>Rating: {review.rating}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="Add-to-cart">Add To Cart</button>
                      </Link>
                      <Link to="/login">
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
