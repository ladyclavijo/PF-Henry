import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51NG2ovEoyRXOeDm5vXpDfSqMqCTF1XPioMsQz5ZZ6aFADDrZ9s4RKikHU0XLdF3dJtr55oTPdv31Sx2iflEysSDS004G9VQN5U");

export default function Payment() {
  const [products, setProducts] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const addToCart = (product) => {
    setProducts([...products, product]);
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (!error) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post('/payments',
            [{ id: 2, qty: 2 }]
          );
          console.log(data);
          elements.getElement(CardElement).clear();
          setPurchaseSuccess(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <form className='bg-[#9DC8C5]' onSubmit={handleSubmit}>
        <CardElement />
        <button className="bg-[#303079] text-white rounded-md w-32 hover:bg-[#7496b8]">Confirm</button>
      </form>
    );
  };

  return (
    <div className="text-black text-center">
      Payment Method
      <h4 className="text-white">
        <Elements stripe={stripePromise}>
          {purchaseSuccess ? (
            <p>Compra realizada con éxito</p>
          ) : (
            <CheckoutForm />
          )}
        </Elements>
      </h4>
      <form></form>
    </div>
  );
};
