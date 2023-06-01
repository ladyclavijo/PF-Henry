import {
  GET_BOOKS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAIL,
  CREATE_BOOK,
  CLEAR_FILTERS,
  PAGINATED,
  CLEAR_DETAILS,
  GET_ALL_GENRES
} from "../actions/actionsTypes";

const initialState = {
  allBooks: [],
  bookSorted: [],
  booksDetail: [],
  bookCreate: [],
  error: [],
  paginated: 1,
  genres: [],
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
        bookDetail: action.payload,
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
        genres: action.payload,
      }

    default:
      return state;
  }
}
