import React, { Fragment, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import { deleteCarts, deleteFromCart } from "../../redux/actions/index.jsx";
import { clearCart, getCartsDB } from "../../redux/actions/index.jsx";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/authContext.jsx";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartsDB());
  }, [cartItems]);

  const allCarts = useSelector((state) => state.allCarts);

  const findCartByUser = allCarts.filter((c) => c.userId === user.uid);

  const handleRemoveCartFromCart = async (productId) => {
    await dispatch(
      deleteCarts({
        userId: user.uid,
        bookId: productId,
      })
    );
    await dispatch(deleteFromCart(productId));
  };

  const handleClearAllCart = async () => {
    if (
      !window.confirm("All products in the cart will be removed. Are you sure?")
    )
      return;
    for (let i = 0; i < findCartByUser.length; i++) {
      await dispatch(
        deleteCarts({
          userId: findCartByUser[i].userId,
          bookId: findCartByUser[i].bookId,
        })
      );
    }
    await dispatch(clearCart());
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <div className="bg-slate-300 min-h-screen w-screen">
      <NavBar />
      <div>
        <h2 className="mt-11">Your Cart:</h2>
        <button onClick={handleClearAllCart}>Clean Cart</button> <br />
        {cartItems.map((item) => (
          <div key={item.id} className="item-container">
            <h3>{item.title}</h3>
            <button onClick={() => handleRemoveCartFromCart(item.id)}>
              <FaTrash size={17} />
            </button>
            <img src={item.cover} alt={`${item.title} cover`} />
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}
        <Link to="/buy">
          <button>Complete Purchase</button>
        </Link>
      </div>
    </div>
  );
}
