import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

export default function Landing() {
  return (
    <div>
      <header>
        <nav>

          <Link to="/about">
            <button>Contact us</button>
          </Link>
        </nav>
      </header>

      <section id="inicio">
        <div className="container">
          <h1>BookBoster</h1>
          <p>Cambia y vende libros usados de manera fácil y rápida.</p>
          <Link to="/home">
            <button>Log in</button>
          </Link>
        </div>
      </section>

      <section id="cambiar">
        <div className="container">
          <h2>Cambia tus libros</h2>
          <p>Explora nuestra amplia selección de libros usados y encuentra nuevas lecturas.</p>
        </div>
      </section>

      <section id="vender">
        <div className="container">
          <h2>Vende tus libros</h2>
          <p>Gana dinero extra vendiendo los libros que ya no necesitas.</p>
        </div>
      </section>

      <section id="contacto">
        <div className="container">
          <h2>Contacto</h2>
          <p>¡Contáctanos si tienes alguna pregunta o sugerencia!</p>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2023 BookBoster. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
