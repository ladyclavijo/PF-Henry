import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  clearDetail,
  getBookDetail,
  getCartsDB,
  postCarts,
  setQuantity,
  updateCarts,
  getUserDetail,
} from "../../redux/actions/index.jsx";
import { useAuth } from "../../context/authContext";
import { addToCart } from "../../redux/actions/index.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import "./Details.css";
import Stock from "../../components/Stock/Stock.jsx";
import Swal from "sweetalert2";

export default function Details() {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const book = useSelector((state) => state.booksDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.quantity);
  const [stock, setStock] = useState(book.stock);
  const cart = useSelector((state) => state.cart);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getCartsDB());
  }, [cart]);

  useEffect(() => {
    if (user) {
      dispatch(getUserDetail(user.uid));
    }
  }, [user, dispatch]);

  const userDetail = useSelector((state) => state.userDetail);

  const allCarts = useSelector((state) => state.allCarts);

  useEffect(() => {
    setLoading(true);
    dispatch(getBookDetail(id));
    dispatch(setQuantity({ qty: 1 }));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

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

  const handleAddToCart = async () => {
    if (allCarts.length > 0) {
      const findCartWithUserAndBook = allCarts.filter(
        (c) => c.userId === user.uid && c.bookId === book.id
      );
      console.log(findCartWithUserAndBook);

      const errorAlert = () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: `You have reached the limit of available stock. Remember that you already have ${findCartWithUserAndBook[0].quantity} units of this book in your cart.`,
        });
      };

      const successfullyAlert = () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      };

      if (findCartWithUserAndBook.length > 0) {
        const qty = quantity + findCartWithUserAndBook[0].quantity;

        if (qty <= book.stock) {
          try {
            Swal.fire({
              position: "center",
              icon: "info",
              title: "Adding to cart...",
              showConfirmButton: false,
            });

            await dispatch(
              updateCarts({
                quantity: qty,
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
              stock: book.stock,
            };

            await dispatch(addToCart(cartData));
            await dispatch(getCartsDB());
            await dispatch(setQuantity({ id: book.id, qty: quantity }));

            Swal.close();
            successfullyAlert();
          } catch (error) {
            Swal.close();
            errorAlert();
          }
        } else {
          errorAlert();
        }
      } else {
        try {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Adding to cart...",
            showConfirmButton: false,
          });

          await dispatch(
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
            stock: book.stock,
          };

          await dispatch(addToCart(cartData));
          await dispatch(getCartsDB());
          await dispatch(setQuantity({ id: book.id, qty: quantity }));

          Swal.close();
          successfullyAlert();
        } catch (error) {
          Swal.close();
          errorAlert();
        }
      }
    } else {
      try {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Adding to cart...",
          showConfirmButton: false,
        });

        await dispatch(
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
          stock: book.stock,
        };

        await dispatch(addToCart(cartData));
        await dispatch(getCartsDB());
        await dispatch(setQuantity({ id: book.id, qty: quantity }));

        Swal.close();
        successfullyAlert();
      } catch (error) {
        Swal.close();
        errorAlert();
      }
    }
  };

  const handleAddReview = () => {
    const reviewData = {
      bookId: book.id,
      reviewContent: comment,
      rating: rating,
      userId: user.uid,
    };
    saveReview(reviewData)
      .then((response) => {
        // Actualiza la lista de reseñas mostrada en el frontend si es necesario
        dispatch(getBookDetail(id));
        setReviews(book.reviews);
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
      const response = await axios.post("/users/review", reviewData);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error al guardar la reseña");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClick = (value) => {
    if (value === rating) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const handleDeleteReview = (id, userId) => {
    if (user) {
      const userDB = allUsers.find((u) => u.id === user.uid);
      if (user.uid === userId || userDB.isAdmin) {
        deleteReview(id)
          .then(() => {
            // Actualiza la lista de reseñas mostrada en el frontend si es necesario
            const updatedReviews = reviews.filter((review) => review.id !== id);
            setReviews(updatedReviews);
          })
          .catch((error) => {
            console.error(error);
            // Maneja el error en caso de fallo en la solicitud
          });
      }
    }
  };
  const deleteReview = async (id) => {
    try {
      const response = await axios.delete(`/users/review/delete/${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error al eliminar la reseña");
      }
    } catch (error) {
      throw error;
    }
  };


  const handleuserHasPurchasedBook = () => {
    if (user) {
      // const items = userDetail.response.orders.map((o) => o.items[0]);
      // console.log(items);
      const hasPurchasedBook = userDetail.response.orders.filter(element => element.items.some(elem => elem.id === book.id))
      if (hasPurchasedBook.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

    return (
    <div className="bg-slate-300 min-h-screen w-screen">
      <NavBar />
      {!book.author || userDetail.length === 0 ? (
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
                  <div>
                    <p>Seller: {book.publisher}</p>
                  </div>
                  {user ? (
                    <>
                      {book.stock > 0 ? (
                        <>
                          <Stock stock={book.stock}></Stock>
                          <button
                            className="Add-to-cart"
                            onClick={handleAddToCart}
                          >
                            Add To Cart
                          </button>
                          <h4 className="stock">Stock: {book.stock}</h4>
                          <button className="Buy-it" onClick={handleBuyClick}>
                            Buy it
                          </button>
                          <div className="reviews">
                            {handleuserHasPurchasedBook () && (
                              <>
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
                                          starValue <= rating
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                        }
                                        onClick={() => handleClick(starValue)}
                                      />
                                    );
                                  })}
                                </div>
                                <br />
                                <button onClick={handleAddReview} disabled={!handleuserHasPurchasedBook ()}>Submit</button>
                              </>
                            )}
                            <h2>Reviews</h2>
                            {reviews?.map((review) => (
                              <div key={review?.id}>
                                <button
                                  className="mt-2 text-red-600"
                                  onClick={() =>
                                    handleDeleteReview(
                                      review?.id,
                                      review?.userId
                                    )
                                  }
                                >
                                  <FaTrash size={17} />
                                </button>
                                <h3>
                                  UserName:{" "}
                                  {review?.user?.username ||
                                    "Error user with no name"}
                                </h3>
                                <p>Comment: {review?.reviewContent}</p>
                                <p>Rating: {review?.rating}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            className="Add-to-cart"
                            onClick={handleAddToCart}
                            disabled={book.stock <= 0}
                          >
                            Add To Cart
                          </button>
                          <h4 className="stock">Stock: Out of stock</h4>
                          <button
                            className="Buy-it"
                            onClick={handleBuyClick}
                            disabled={book.stock <= 0}
                          >
                            Buy it
                          </button>
                          <div className="reviews">
                            {handleuserHasPurchasedBook && (
                              <>

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
                                          starValue <= rating
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                        }
                                        onClick={() => handleClick(starValue)}
                                      />
                                    );
                                  })}
                                </div>
                                <br />
                                <button onClick={handleAddReview} disabled={!handleuserHasPurchasedBook ()}>Submit</button>
                              </>
                            )}
                            <h2>Reviews</h2>
                            {reviews?.map((review) => (
                              <div key={review.id}>
                                <button
                                  className="mt-2 text-red-600"
                                  onClick={() =>
                                    handleDeleteReview(
                                      review?.id,
                                      review?.userId
                                    )
                                  }
                                >
                                  <FaTrash size={17} />
                                </button>
                                <h3>
                                  UserName:{" "}
                                  {review?.user?.username ||
                                    "Error user with no name"}
                                </h3>
                                <p>Comment: {review?.reviewContent}</p>
                                <p>Rating: {review?.rating}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {book.stock > 0 ? (
                        <>
                          <h4 className="stock">Stock: {book.stock}</h4>
                          <Link to="/login">
                            <button className="Add-to-cart">Add To Cart</button>
                          </Link>
                          <Link to="/login">
                            <button className="Buy-it">Buy it</button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <h4 className="stock">Stock: No hay stock</h4>
                          <Link to="/login">
                            <button className="Add-to-cart">Add To Cart</button>
                          </Link>
                          <Link to="/login">
                            <button className="Buy-it">Buy it</button>
                          </Link>
                        </>
                      )}
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
};
