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

  //   useEffect(() => {
  //     console.log("Cart Items:", cartItems);
  //   }, [cartItems]);

  return (
    <div className="bg-slate-300 min-h-screen flex flex-col">
      <NavBar />
      <div className="m-6 ">
        <div className="flex items-center justify-between">
          <h1 className="mt-16 font-bold text-3xl ml-10">Your Cart</h1>
          <div>
            <button className="mt-2 mt-5 mr-10 px-4 py-2 text-white bg-red-600 rounded" onClick={handleClearAllCart}>Clean Cart</button>
          </div>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="mt-5 flex items-start bg-green-200 m-10 p-3 relative">
            <img className="w-32" src={item.cover} alt={`${item.title} cover`} />
            <div className="ml-2 flex flex-col flex-grow self-start">
              <h3 className="self-start font-bold text-xl">{item.title}</h3>
              <p className="self-start text-gray-500">Quantity: {item.quantity}</p>
              <div className="flex flex-col items-start">
                <p className="mt-2 text-green-600 font-bold self-start">Price: {item.price}</p>
                <button className="mt-2 text-red-600" onClick={() => handleRemoveCartFromCart(item.id)}><FaTrash size={17} /></button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <Link to="/buy">
            <button className="px-4 py-2 text-white bg-blue-600 rounded">Complete Purchase</button>
          </Link>
        </div>
      </div>
    </div>
  );

}