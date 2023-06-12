import React, { Fragment } from "react";
// import CartButton from "../CartButton/CartButton.jsx"
import { Link } from "react-router-dom"


export default function Card({ id, title, author, cover, stock, genres, price }) { // Props basadas en la API

    // function handleAddCart() { // Acá iría toda la lógica de añadir el libro a la lista de la compra
    //     console.log("WIP")
    // }
    if (stock) { // Este "if()" es para saber si el libro está en stock o no 
        return (
            <div className="bg-[#9DC8C5] border-2 border-[#9DC8C5] w-64 h-128 rounded-md hover:opacity-75 transition duration-500 mx-auto">
                <div className="p-4 flex flex-col justify-between h-full ">
                    <Link to={"/book/" + id} className="text-black ">
                        <div className="bg-[#9DC8C5]">
                            <h3 className="text-xl font-semibold h-20 overflow-hidden mb-2">{title}</h3>
                            <div className="mt-1 flex-grow">
                                <img src={cover} alt={title} className="w-full h-auto" />
                            </div>
                            <p className="mt-2">{author}</p>
                            <p className="mt-2">${price}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <Fragment>
                <div className="bookName">
                    <h3>{title}</h3>
                </div>
                <div className="info">
                    <div className="author">
                        <p>{author}</p>
                    </div>
                    <div className="image">
                        <img src={cover} alt={title} />
                    </div>
                    <p>Sold out</p> {/* Línea provisional */}
                </div>
            </Fragment>
        )
    }
}