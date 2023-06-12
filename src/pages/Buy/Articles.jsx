import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Articles() {
    const cartItems = useSelector((state) => state.cart);
    const location = useLocation();
    const bookData = location.state;

    return (
        <div>
            <h2>Order Summary</h2>
            {bookData ? (
                <div>
                    <h2>Title: {bookData.title}</h2>
                    <img src={bookData.cover} alt="Book cover" />
                    <h2>Price: ${bookData.price}</h2>
                    <h2>Quantity: {bookData.quantity}</h2>
                    <h2>Total: ${bookData.price * bookData.quantity}</h2>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h2>Title: {item.title}</h2>
                        <img src={item.cover} alt="Book cover" />
                        <h2>Price: ${item.price}</h2>
                        <h2>Quantity: {item.quantity}</h2>
                        <h2>Total: ${item.price * item.quantity}</h2>
                    </div>
                ))
            )}
        </div>
    );
}
