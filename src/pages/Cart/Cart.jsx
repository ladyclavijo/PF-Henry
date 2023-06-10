import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx"

export default function Cart() {
    const books = useSelector((state) => state.allBooks);
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItemIds = storedCartItems ? JSON.parse(storedCartItems) : [];

    const cartBooks = books.filter((book) =>
        cartItemIds.includes(book.id)
    );

    console.log(cartItemIds)

    function sendData() {
        
    }

    return (
        <Fragment>
            <NavBar/>
            <div className="bg-white text-black-500">
                <h2 className="mt-4 font-bold p-4">Carrito de la compra</h2>
                    {cartBooks.length > 0 ? (
                    <ul>
                        {cartBooks.map((item) => (
                            <li key={item.id}>
                                Name: {item.name}
                                {/* {item.cover} */}
                                Price: {item.price}
                                Quantity: {item.quantity}
                            </li>
                    ))}
                    </ul>
                ) : (
                    <Link to="/home">
                        <p className="mb-3">There are no products here yet. Click to go home</p>
                    </Link>
                )}
            </div>
            <div>
                <Link to="/buy"> // id & qty
                    <buton onClick={()=> alert("Your product has been bought")} className="border-3 p-1 m-4">Buy</buton>
                </Link>
            </div>
        </Fragment>
    );
}





// return (
//     <Fragment>
//         <NavBar/>
        
//     </Fragment>
// )