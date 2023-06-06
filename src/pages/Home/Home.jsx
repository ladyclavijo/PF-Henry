import "./Home.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {loadStripe} from '@stripe/stripe-js';
// import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import Loader from '../../components/Loader/Loader.jsx';
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getBooks } from "../../redux/actions/index.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import logo from "../../assets/images/Logo.png";
import Filters from "../../components/Filters/Filters";

export default function Home() {

  const [cardsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const bookSorted = useSelector(state => state.bookSorted);
  const currentPages = useSelector(state => state.paginated);
  const error = useSelector(state => state.error);

  const lastCardIndex = currentPages * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = bookSorted.slice(firstCardIndex, lastCardIndex);


  useEffect(()=>{
    setLoading(true);
    dispatch(getBooks());
    setTimeout(()=>{
        setLoading(false);
    },1000);
  },[dispatch]);

  // const stripePromise = loadStripe("pk_test_51NG2ovEoyRXOeDm5vXpDfSqMqCTF1XPioMsQz5ZZ6aFADDrZ9s4RKikHU0XLdF3dJtr55oTPdv31Sx2iflEysSDS004G9VQN5U");

  // const CheckoutForm = () => {

  //   const stripe = useStripe();
  //   const elements = useElements();
  
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  
  //     const {error, paymentMethod} =  await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: elements.getElement(CardElement),
  //     });
  
  //     if(!error) {
  //       console.log(paymentMethod);
  //     }
  //   };
  
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <CardElement />
  //       <button>Buy</button>
  //     </form>
  //   )
  // };




  return (
    <div className="home-page">

      <div className="home-navbar">

        <div className="div-logo">
          <img src={logo} alt="logo"/>
        </div>

        <div className="div-searchbar">
         <SearchBar/>
        </div>

        <div className="div-form">
         <Link to="/form">
           <span>Publish Book</span>
         </Link>
       </div>

      </div>

      <div className="div-filters">
        <Filters/>
      </div>

      <div>
        <NavBar setLoading={setLoading}/>
      </div>
      

      <div className="div-cards">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
          {loading ? (
            <Loader />
          ) : (
            currentCards?.map((book) => {
              return (
                <Card 
                key={book.id}
                id={book.id} 
                title={book.title} 
                author={book.author} 
                cover={book.cover} 
                stock={book.stock}
                genres={book.genres} 
                price={book.price}
                />
              )
            })
          )}
        </div>
      {!error.length && (
        <Pagination 
        cardsPerPage={cardsPerPage}
        bookSorted={bookSorted.length}/>
      )}
      </div>

    </div>

  );
};