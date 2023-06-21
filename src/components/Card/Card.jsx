import React, { Fragment, useContext } from "react";
// import CartButton from "../CartButton/CartButton.jsx"
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import "../../Styles/colors.css";

export default function Card({
  id,
  title,
  author,
  cover,
  stock,
  genres,
  price,
}) {

  const { theme } = useContext(ThemeContext);

  const containerClassName = `bg-[#bbf7d0] w-64 h-125 rounded-md hover:opacity-75 hover:text-white transition duration-500 mx-auto ${
    theme === "dark" ? "dark-mode" : "light-mode"
  }`;

    const styles = {
        container: {
            backgroundColor: "var(--color-cards)",
            color: "var(--color-text)",
            borderColor: "var(--color-border)",
            transition: "border-color 0.5s",
        },
    };
  // Props basadas en la API

  // function handleAddCart() { // Acá iría toda la lógica de añadir el libro a la lista de la compra
  //     console.log("WIP")
  // }
  if (stock) {
    // Este "if()" es para saber si el libro está en stock o no
    return (
      <div className={containerClassName} style={styles.container}>
        <div className="p-4 flex flex-col justify-between h-full " >
          <Link to={"/book/" + id} className="text-black ">
            <div className={`bg-[#bbf7d0]`} style={styles.container}>
              <h3 className="text-xl font-medium h-20 overflow-hidden mb-2 text-center hover:text-white">
                {title}
              </h3>
              <div className="mt-1 flex-grow">
                <img src={cover} alt={title} className="w-full h-auto" />
              </div>
              <p className="mt-2 text-center font-light hover:text-white">{author}</p>
              <p className="mt-2 text-center font-bold text-xl hover:text-black">${price}</p>
            </div>
          </Link>
          {/* <CartButton
                        id={id}
                    /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className={containerClassName} style={styles.container}>
        <div className="p-4 flex flex-col justify-between h-full ">
          <Link to={"/book/" + id} className="text-black ">
            <div className={`bg-[#bbf7d0]`} style={styles.container}>
              <h3 className="text-xl font-medium h-20 overflow-hidden mb-2 text-center hover:text-white">
                {title}
              </h3>
              <div className="mt-1 flex-grow">
                <img src={cover} alt={title} className="w-full h-auto" />
              </div>
              <p className="mt-2 text-center font-light hover:text-white">{author}</p>
              <p className="mt-2 text-center font-extrabold text-lg hover:text-black">Out of stock</p>
            </div>
          </Link>
          {/* <CartButton
                    id={id}
                /> */}
        </div>
      </div>
    );
  }
}
