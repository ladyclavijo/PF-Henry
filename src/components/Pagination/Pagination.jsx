import { useSelector, useDispatch } from "react-redux";
import { getPages } from "../../redux/actions";
import style from "./Pagination.module.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ bookSorted, cardsPerPage }) {
  const currentPage = useSelector((state) => state.paginated);
  const dispatch = useDispatch();

  let pages = Math.ceil(bookSorted / cardsPerPage);

  const hasNextPage = currentPage < pages;
  const hasPreviousPage = currentPage > 1;

  // Crear un rango de números de página
  const pageRange = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className={style.pagination}>
      <div>
        <span>
          <button
            className={`${style.prevNext} ${style.arrowButton}`}
            onClick={() => dispatch(getPages(currentPage - 1))}
            disabled={!hasPreviousPage}
            style={{ visibility: hasPreviousPage ? "visible" : "hidden" }}
          >
            <FaChevronLeft />
          </button>
        </span>
      </div>
      <div>
        {/* Mostrar los números de página */}
        {pageRange.map((page) => (
          <button
            key={page}
            className={`${style.button} ${style.pageButton} ${currentPage === page && style.active}`}
            onClick={() => dispatch(getPages(page))}
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        <span>
          <button
            className={`${style.prevNext} ${style.arrowButton}`}
            onClick={() => dispatch(getPages(currentPage + 1))}
            disabled={!hasNextPage}
            style={{ visibility: hasNextPage ? "visible" : "hidden" }}
          >
            <FaChevronRight />
          </button>
        </span>
      </div>
    </div>
  );
};
