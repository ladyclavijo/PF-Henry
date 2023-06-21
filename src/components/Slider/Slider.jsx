import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../Slider/Slider.css";

export default function SliderComponent () {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/payments/sales');
        setBestSellers(response.data.bestSellers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <h2>Best Sellers</h2>
      <Slider {...settings}>
        {bestSellers.map((item) => (
          <div key={item.id} className="slide-item">
            <img src={item.cover} alt={item.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};



// import "../Slider/Slider.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Slider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [bestSellers, setBestSellers] = useState([]);

//   const cardsPerPage = 5;
//   const totalPages = Math.ceil(bestSellers.length / cardsPerPage);

//   useEffect(() => {
//     axios.get("/payments/sales")
//       .then((response) => {
//         setBestSellers(response.data.bestSellers);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handlePrevSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? bestSellers.length - 1 : prevSlide - 1
//     );
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === bestSellers.length - 1 ? 0 : prevSlide + 1
//     );
//   };

//   const startCardIndex = currentSlide * cardsPerPage;
//   const visibleCards = bestSellers.slice(
//     startCardIndex,
//     startCardIndex + cardsPerPage
//   );

//   return (
//     <div className="slider">

//       <div className="slider-inner">
//         {bestSellers.length > 0 &&
//           bestSellers.map((book, index) => (
//             <div
//               key={index}
//               className={`slide ${index === currentSlide ? "current" : ""}`}
//             >
//               <div className="card">
//                 <img src={book.cover} />
//                 {/* <h3>{book.title}</h3> */}
//                 {/* <p>{book.author}</p> */}
//               </div>
//             </div>
//           ))}
//       </div>

//       <div className="slider-navigation">
//         <button className="prev-slide" onClick={handlePrevSlide}>
//           Prev
//         </button>
//         <div className="slide-indicators">
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <div
//               key={index}
//               className={`indicator ${
//                 index === currentSlide ? "active" : ""
//               }`}
//               onClick={() => setCurrentSlide(index)}
//             ></div>
//           ))}
//         </div>
//         <button className="next-slide" onClick={handleNextSlide}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }