
import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../context/authContext";
const stripePromise = loadStripe(
  "pk_test_51NG2ovEoyRXOeDm5vXpDfSqMqCTF1XPioMsQz5ZZ6aFADDrZ9s4RKikHU0XLdF3dJtr55oTPdv31Sx2iflEysSDS004G9VQN5U"
);


export default function Payment() {
  const [user, setUser] = useState({
    items: [{ id: 6, qty: 2 }, { id: 7, qty: 1 }],
    userId: null, // O cualquier valor predeterminado que desee
    email: ''
  });

  const [products, setProducts] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const location = useLocation();
  const bookData = location.state; // bookData se usa cuando solo se compra 1 ID cantidades que quieras

  const addToCart = (product) => {
    setProducts([...products, product]);
  };

  const authUser = useAuth()?.user?.uid;
  const userEmail = useAuth()?.user?.email
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      userId: authUser,
      email: userEmail,
    }));
  }, [authUser]);

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (!error) {
        const { id } = paymentMethod;
        console.log(id)
        try {
          const { data } = await axios.post("/payments", {
            payment_method: id,
            receipt_email: user.email,
            items: user.items
          });
          console.log(data);
          elements.getElement(CardElement).clear();
          setPurchaseSuccess(true);
        } catch (error) {
          console.log(error);
        }
        try {
          await axios.post("/payments/order", user);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <form className="bg-[#9DC8C5]" onSubmit={handleSubmit}>
        <CardElement />
        <button className="bg-[#303079] text-white rounded-md w-32 hover:bg-[#7496b8]">
          Confirm
        </button>
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
}
