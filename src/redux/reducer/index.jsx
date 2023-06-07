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
  appliedFilters: { genre: null, language: null },
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
        bookSorted: state.allBooks,
        appliedFilters: { genre: null, language: null },
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
        const genresAux = action.payload;
        const { language } = state.appliedFilters;
        let filteredBooks = [...state.allBooks];
  
        if (language) {
          filteredBooks = filteredBooks.filter((b) => b.language === language);
        }
  
        if (genresAux === "Genres") {
          return {
            ...state,
            bookSorted: filteredBooks,
            appliedFilters: { ...state.appliedFilters, genre: null },
          };
        }
  
        filteredBooks = filteredBooks.filter((b) => {
          return b.genres.some((genre) => genre.name === genresAux);
        });
  
        return {
          ...state,
          bookSorted: filteredBooks,
          appliedFilters: { ...state.appliedFilters, genre: genresAux },
        };
    case SORT_BY:
      const { genre: sortGenre, language: sortLanguage } = state.appliedFilters;
      let sortedBooks = [...state.allBooks];

      if (sortGenre) {
        sortedBooks = sortedBooks.filter((b) => b.genre.includes(sortGenre));
      }

      if (sortLanguage) {
        sortedBooks = sortedBooks.filter((b) => b.language === sortLanguage);
      }

      if (action.payload === "PRI-") {
        sortedBooks.sort((a, b) => a.price - b.price);
      } else if (action.payload === "PRI+") {
        sortedBooks.sort((a, b) => b.price - a.price);
      } else if (action.payload === "ASC") {
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "DES") {
        sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
      }

      return {
        ...state,
        bookSorted: sortedBooks,
      };
      case FILTER_BY_LANGUAGES:
        const selectedLanguage = action.payload;
        const { genre } = state.appliedFilters;
        let languageFilteredBooks = [...state.allBooks];
  
        if (genre) {
          languageFilteredBooks = languageFilteredBooks.filter((b) => b.genre.includes(genre));
        }
  
        if (selectedLanguage === "All") {
          return {
            ...state,
            bookSorted: languageFilteredBooks,
            appliedFilters: { ...state.appliedFilters, language: null },
          };
        }
  
        languageFilteredBooks = languageFilteredBooks.filter((b) => b.language === selectedLanguage);
  
        return {
          ...state,
          bookSorted: languageFilteredBooks,
          appliedFilters: { ...state.appliedFilters, language: selectedLanguage },
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
