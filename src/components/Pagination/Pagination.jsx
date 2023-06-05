import { useSelector, useDispatch } from "react-redux";
import { getPages } from "../../redux/actions";
import style from "./Pagination.module.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// export default function Pagination({ bookSorted, booksPerPage }) {
//   const currentPage = useSelector((state) => state.paginated);
//   const dispatch = useDispatch();

//   let pages = [];

//   for (let i = 1; i < Math.ceil(bookSorted / booksPerPage); i++) {
//     pages.push(i);
//   }

//   return (
//     <div>
//       <div>
//         {currentPage === 1 ? (
//           <button></button>
//         ) : (
//           <button onClick={() => dispatch(getPages(currentPage - 1))}>
//             {"<"}
//           </button>
//         )}
//       </div>
//       <div>
//         <button>{currentPage}</button>
//       </div>
//       <div>
//         {currentPage === pages.length ? (
//           <button></button>
//         ) : (
//           <button onClick={() => dispatch(getPages(currentPage + 1))}>
//             {">"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


export default function Pagination({ bookSorted, cardsPerPage }) {
  const currentPage = useSelector((state) => state.paginated);
  const dispatch = useDispatch();

  let pages = Math.ceil(bookSorted / cardsPerPage);

  const hasNextPage = currentPage < pages;

  return (
    <div className={style.pagination}>
      <div>
      <span>
        <button
          className={`${style.prevNext}`}
          onClick={() => dispatch(getPages(currentPage - 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        </span>
      </div>
      <div>
        <button  className={`${style.button} ${currentPage && style.active}`} >{currentPage}</button>
      </div>
      <div>
      <span>
        <button
        className={`${style.prevNext}`}
          onClick={() => dispatch(getPages(currentPage + 1))}
          disabled={!hasNextPage}
        >
          <FaChevronRight />
        </button>
        </span>
      </div>
    </div>
  );
}