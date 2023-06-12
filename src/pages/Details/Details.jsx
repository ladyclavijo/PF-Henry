import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import { getBookDetail } from '../../redux/actions/index.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import './Details.css';
import { useAuth } from '../../context/authContext';
import { TbTruckDelivery } from 'react-icons/tb';
import { addToCart } from '../../redux/actions/index.jsx';

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

  const handleBuyClick = () => {
    const bookData = {
      //INFO QUE ENVIA EL BOTON BUY IT-------------------------------------------------------------
      id: book.id,
      title: book.title,
      cover: book.cover,
      price: book.price,
      quantity: quantity,
    };
    console.log(bookData)
    navigate('/buy', { state: bookData });
  };

  const handleAddToCart = () => {
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
      alert('Successfully added to cart');
    } else {
      alert(`Cannot add ${quantity} items to cart. Only ${remainingStock} items available.
      You already have ${quantityInCart} items in your cart.`);
    }
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
                        Genres: {`${book.genres[0].name}, ${book.genres[1].name}`}
                      </h2>
                    )}
                  </div>
                </div>
              )}
              <div className="price">
                <h1>${book.price}</h1>
                <div className="delivery-container">
                  <span>
                    <TbTruckDelivery className="icon" /> Free delivery on orders over $15!
                  </span>
                  {user ? (
                    <>
                      <div className="quantity-select">
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                        >
                          {Array.from({ length: book.stock }, (_, index) => index + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      {/* EL BOTON DE ABAJO DEBE ENVIAR COSAS AL CARRITO, NO MANDARTE A LA RUTA CART */}
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