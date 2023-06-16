import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import imagen from "../../assets/landing-image.png"
import logo from "../../assets/Logo.png"

export default function Landing() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt="Book Logo"
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
        <div className="buttons">
          {/* <button className="buttonLog">Log In</button>
          <button className="buttonSign">Sign Up</button> */}

        </div>
      </nav>
      <div className="content">
        <div className="text-container">
          <div className="blue-box">
            <h2>Explore a world of books at your fingertips.</h2>
            <Link to="/home">
              <button className="explore-button">Explore books</button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img
            src={imagen}
            alt="Book Image"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
