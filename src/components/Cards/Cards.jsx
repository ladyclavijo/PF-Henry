// import React, { Fragment } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getBooks } from "../../redux/actions/index";
// import Card from "../Card/Card.jsx";

// export default function Cards() {
//   const dispatch = useDispatch();
//   const allBooks = useSelector((state) => state.bookSorted);
//   // const [actualPage, setActualPage] = useState(1); // para el paginado

//   useEffect(() => {
//     dispatch(getBooks());
//   }, [dispatch]);

//   // console.log(allBooks)

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//       {/* {allBooks.map((book) => {
//         console.log(book);
//         if (book.stock !== 0) {
//           <div key={book.id}>
//             <Card
//               id={book.id}
//               title={book.title}
//               author={book.author}
//               cover={book.cover}
//               price={book.price}
//             />
//           </div>;
//         } else {
//           null;
//         }
//       })} */}
//     </div>
//   );
// }
