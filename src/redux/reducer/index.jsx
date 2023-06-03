import {
  GET_BOOKS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAIL,
  CREATE_BOOK,
  CLEAR_FILTERS,
  PAGINATED,
  CLEAR_DETAILS,
  GET_ALL_GENRES,
  FILTER_BY_GENRES,
  SORT_BY,
  FILTER_BY_LANGUAGES,
  GET_GENRES_BY_ID,
  GET_AUTHORS,
  GET_AUTHORS_BY_ID,
} from "../actions/actionsTypes";

const initialState = {
  allBooks: [],
  bookSorted: [],
  booksDetail: [],
  bookCreate: [],
  error: [],
  paginated: 1,
  genre: [],
  genresId: [],
  authors: [],
  authorsId: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookSorted: action.payload,
        allBooks: action.payload,
      };
    case GET_BOOK_DETAIL:
      return {
        ...state,
        booksDetail: action.payload,
      };
    case GET_BOOKS_BY_NAME:
      return {
        ...state,
        bookSorted: action.payload,
      };
    case CREATE_BOOK:
      return {
        ...state,
        bookCreate: action.payload,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        allBooks: action.payload,
        bookSorted: [],
        error: {},
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        booksDetail: [],
      };
    case PAGINATED:
      return {
        ...state,
        paginated: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genre: action.payload,
      };
    case FILTER_BY_GENRES:
      //  const allBooks = state.bookSorted
      //  const bookFilter = action.payload === 'book' ? allBooks.filter(f=> f.book.length!==0): action.payload === 'noB'? allBooks.filter(f=>!f.book.length) : allBooks
      //   return {
      //     ...state,
      //     bookSorted:bookFilter
      //   };
      const genres= action.payload;
      const filterByGenres = [...state.allBooks].filter((b) => {
        return b.genre.includes(genres);
      });
      return {
        ...state,
        bookSorted: filterByGenres ,
      };
    case SORT_BY:
      if (action.payload === "PRI-") {
        return {
          ...state,
          bookSorted: state.bookSorted
            .slice()
            .sort((a, b) => a.price - b.price),
        };
      } else if (action.payload === "PRI+") {
        return {
          ...state,
          bookSorted: state.bookSorted
            .slice()
            .sort((a, b) => b.price - a.price),
        };
      } else if (action.payload === "ASC") {
        const result = state.bookSorted.slice().sort((a, b) => {
          if (a.title < b.title) return -1;
          if (b.title < a.title) return 1;
          return 0;
        });
        return {
          ...state,
          bookSorted: result,
        };
      } else if (action.payload === "DES") {
        const result = state.bookSorted.slice().sort((a, b) => {
          if (a.title < b.title) return -1;
          if (b.title < a.title) return 1;
          return 0;
        });
        return {
          ...state,
          bookSorted: result.reverse(),
        };
      } else {
        return {
          ...state,
          bookSorted: state.allBooks,
        };
      }
    case FILTER_BY_LANGUAGES:
      const allLanguages = state.allBooks;
      const filterLanguage =
        action.payload === "All"
          ? allLanguages
          : allLanguages.filter((f) => f.language === action.payload);
      return {
        ...state,
        bookSorted: filterLanguage,
      };
    case GET_GENRES_BY_ID:
      return {
        ...state,
        genresId: action.payload,
      };
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    case GET_AUTHORS_BY_ID:
      return {
        ...state,
        authorsId: action.payload,
      };

    default:
      return state;
  }
}
