import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export default function CartButton({ id }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { id: item.id, quantity: 1 }]);
    }
  }

  function removeFromCart(item) {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      if (updatedCart[existingItemIndex].quantity === 1) {
        updatedCart.splice(existingItemIndex, 1);
      } else {
        updatedCart[existingItemIndex].quantity -= 1;
      }
      setCartItems(updatedCart);
    }
  }

  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <div>
      <button className="relative" onClick={() => { addToCart({ id }) }}>Add</button>
      <br/>
      <button onClick={() => { removeFromCart({ id }) }}>Delete</button>
      <br/>
      Quantity total: {totalQuantity}
    </div>
  );
}