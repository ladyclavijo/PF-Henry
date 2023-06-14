import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import { deleteFromCart } from '../../redux/actions/index.jsx';
import { clearCart } from "../../redux/actions/index.jsx";
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveCartFromCart = (productId) => {
        dispatch(deleteFromCart(productId));
    };

    const handleClearAllCart = () => {
        if (!window.confirm("All products in the cart will be removed. Are you sure?")) return;
        dispatch(clearCart());
    }

    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems]);

    const Basurero = () => (
        <div>
          <FaTrash size={17} />
        </div>
      );
    return (
        <div>
            <NavBar />
            <div>
                <h2 className="mt-11">Your Cart:</h2>
                <button onClick={handleClearAllCart}>Clean Cart</button> <br />
                {cartItems.map((item) => (
                    <div key={item.id} className="item-container">
                        <h3>{item.title}</h3>
                        <button onClick={() => handleRemoveCartFromCart(item.id)}><Basurero /></button>
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
