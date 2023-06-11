import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Articles() {
    const location = useLocation();
    const bookData = location.state;

    return (
        <div>
            Order summary
            <div>
                {/* Utiliza los datos de bookData para renderizar los detalles del libro */}
                <h2>Title: {bookData.title}</h2>
                <img src={bookData.cover} alt="Book cover" />
                <h2>Price: ${bookData.price}</h2>
                <h2>Quantity: {bookData.quantity}</h2>
                <h2>Total: ${bookData.price * bookData.quantity}</h2>
            </div>
        </div>
    );
}
