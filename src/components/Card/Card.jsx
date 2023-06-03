import React, {Fragment} from "react";
import {Link} from "react-router-dom"


export default function Card({id,title,author,cover,stock,genres, price}) { // Props basadas en la API

    // function handleAddCart() { // Acá iría toda la lógica de añadir el libro a la lista de la compra
    //     console.log("WIP")
    // }
    if(stock) { // Este "if()" es para saber si el libro está en stock o no 
        return (
            <Fragment>
                <Link to={"/book/" + id}>
                    <div className="bookName">
                        <h3>{title}</h3>
                    </div>
                    <div className="info">
                        <div className="author">
                            <p>{author}</p>
                        </div>
                        <div className="image">
                            <img src={cover} alt={title}/>
                        </div>
                        {/* <div className="genres">
                            <p className="genreString">
                            {genres?.map((g) => `${g.name} `).join(', ')}
                            </p>
                        </div> */}
                        <div claasName="price">
                            <p>${price.toLocaleString('es-ES')}</p>
                        </div>
                        {/* <div className="toCart">
                            <button onClick={handleAddCart()}></button>
                        </div> */}
                    </div>
                </Link>
            </Fragment>
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
                        <img src={cover} alt={title}/>
                    </div>
                    <p>Sold out</p> {/* Línea provisional */}
                </div>
            </Fragment>
            )
    }
}
