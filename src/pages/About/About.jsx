import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
  <div>
    <p>About</p>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/">
        <button>Landing</button>
      </Link>

    <div>
      <h1>Who are we?</h1>
    </div>

    <div>
      <h3>We are a website that facilitates the sale of books online. We also allow the exchange of books between users of the page</h3>
    </div>

    <div>
      <h1>Us</h1>
    </div>
      <strong>Backend Developers</strong>
      <ul>
        <li>Franco Aldeco</li>
        <li>Lady</li>
        <li>Stiven Lizarazo</li>
        <li>Agus</li>
      </ul>
    <strong>Frontend Developers</strong>
    <ul>
      <li>Bautista Bauzá</li>
      <li>Juan</li>
      <li>Roberto</li>
    </ul>

  </div>
  )
};




