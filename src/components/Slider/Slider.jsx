import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../Slider/Slider.css";
import { AiOutlineStar } from "react-icons/ai"


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
      <h2 className="slider-title">
        Best Sellers
      </h2>
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