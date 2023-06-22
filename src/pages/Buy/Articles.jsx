import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Payment.css'
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import "../../Styles/colors.css";


export default function Articles() {
  const cartItems = useSelector((state) => state.cart);
  const location = useLocation();
  const bookData = location.state;

  const { theme } = useContext(ThemeContext);

  const styles = {
    container: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
    },
    container2: {
      color: "var(--color-text)",
    },
  };

  return (
    <div className="bg-[#bbf7d0] p-6 rounded shadow mt-20 mb-5" style={styles.container}>
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {bookData ? (
        <div className="flex items-center ">
          <img className="w-20 h-28 object-contain" src={bookData.cover} alt="Book cover" />
          <div>
            <h2 className="text-lg font-semibold" style={styles.container}>{bookData.title}</h2>
            <p className="text-gray-500" style={styles.container}>Price: ${bookData.price}</p>
            <p className="text-gray-500" style={styles.container}>Quantity: {bookData.quantity}</p>
            <p className="text-gray-500" style={styles.container}>Total: ${bookData.price * bookData.quantity}</p>
          </div>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 mt-4">
            <img className="w-20 h-28 object-contain" src={item.cover} alt="Book cover" />
            <div>
              <h2 className="text-lg font-semibold" style={styles.container}>{item.title}</h2>
              <p className="text-gray-500" style={styles.container}>Price: ${item.price}</p>
              <p className="text-gray-500" style={styles.container}>Quantity: {item.quantity}</p>
              <p className="text-gray-500" style={styles.container}>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
