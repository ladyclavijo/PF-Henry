import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import FormLanding from "../../components/FormLanding/FormLanding";

export default function Landing() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <img
            src=""
            alt="Book Logo"
          />
          BookBuster</div>
        <div className="buttons">
          {/* <button className="buttonLog">Log In</button>
          <button className="buttonSign">Sign Up</button> */}
          <Link to="/about">
            <button className="buttonAbout">About</button>
          </Link>
        </div>
      </nav>
      <div className="content">
        <div className="text-container">
          <div className="blue-box">
            <h2>Find the book you are looking for easier to read.</h2>
            <Link to="/home">
              <button className="explore-button">Explore books</button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img
            src="https://www.todoliteratura.es/fotos/1/Alice_Kellen_leyendo_novela_en_primer_plano_copy_Umami_Brands_thumb_468.jpg"
            alt="Book Image"
          />
        </div>
      </div>
    </div>
  );
}
