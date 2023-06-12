import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart);

    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems]);

    return (
        <div>
            <NavBar />
            <div>
                <h2 className="mt-11">Your Cart:</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="item-container">
                        <h3>{item.title}</h3>
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
