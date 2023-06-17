import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Articles() {
  const cartItems = useSelector((state) => state.cart);
  const location = useLocation();
  const bookData = location.state;

  return (
    <div className="bg-[#bbf7d0] p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {bookData ? (
        <div className="flex items-center space-x-4">
          <img className="w-20 h-28 object-contain" src={bookData.cover} alt="Book cover" />
          <div>
            <h2 className="text-lg font-semibold">{bookData.title}</h2>
            <p className="text-gray-500">Price: ${bookData.price}</p>
            <p className="text-gray-500">Quantity: {bookData.quantity}</p>
            <p className="text-gray-500">Total: ${bookData.price * bookData.quantity}</p>
          </div>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 mt-4">
            <img className="w-20 h-28 object-contain" src={item.cover} alt="Book cover" />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500">Price: ${item.price}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-gray-500">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
