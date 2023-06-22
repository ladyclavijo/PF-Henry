import {
  GET_BOOKS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAIL,
  CREATE_BOOK,
  CLEAR_FILTERS,
  PAGINATED,
  CLEAR_DETAIL,
  GET_ALL_GENRES,
  FILTER_BY_GENRES,
  SORT_BY,
  FILTER_BY_LANGUAGES,
  GET_GENRES_BY_ID,
  GET_AUTHORS,
  GET_AUTHORS_BY_ID,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_USERS,
  GET_BOOKS_BY_AUTHOR,
  ADD_TO_CART,
  GET_USER_BY_ID,
  DELETE_FROM_CART,
  CLEAR_CART,
  GET_CARTS_DB,
  QUANTITY,
  TOTAL_ITEMS,
  GET_TOTAL_CHARGES,
  GET_BEST_SELLERS,
  GET_USER_BY_USERNAME,
  UPDATE_PROFILE,
} from "../actions/actionsTypes";

const initialState = {
  allBooks: [],
  allUsers: [],
  allCarts: [],
  userDetail: [],
  bookSorted: [],
  booksDetail: [],
  bookCreate: [],
  error: [],
  paginated: 1,
  genre: [],
  allGenres: [],
  language: [],
  genresId: [],
  authors: [],
  authorsId: [],
  cart: [],
  currentUser: null,
  registrationError: null,
  quantity: 1,
  allQuantity: [],
  dailySales: [],
  totalItemsSold: 0,
  totalCharges: [],
  bestSellers: [],
};

export default function rootReducer(state = initialState, action) {
  let totalItemsSold;
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookSorted: action.payload,
        allBooks: action.payload,
      };

    case ADD_TO_CART: {
      const { id, title, cover, price, quantity, stock } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          }),
        };
      } else {
        const newItem = {
          id,
          title,
          cover,
          price,
          quantity,
          stock,
        };

        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    }
    case DELETE_FROM_CART:
      const updatedCartItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCartItem,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        allQuantity: [],
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
    case GET_BOOKS_BY_AUTHOR:
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
        genre: [],
        language: [],
      };
   
    case CLEAR_DETAIL:
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
        allGenres: action.payload,
      };
    case FILTER_BY_GENRES:
      const genresAux = action.payload;
      const language = state.language;
      let filteredBooks = [...state.allBooks];
      if (language.length !== 0) {
        const filteredBooksByGenre = filteredBooks.filter((b) => {
          return b.genres.some((genres) => genres.name === genresAux);
        });
        console.log(filteredBooksByGenre);
        const filteredBooksByGenreWithLanguage = filteredBooksByGenre.filter(
          (b) => {
            return b.language === language;
          }
        );
        return {
          ...state,
          bookSorted: filteredBooksByGenreWithLanguage,
          genre: genresAux,
        };
      } else {
        const filteredBooksByGenre = filteredBooks.filter((b) => {
          return b.genres.some((genres) => genres.name === genresAux);
        });
        return {
          ...state,
          bookSorted: filteredBooksByGenre,
          genre: genresAux,
        };
      }

    case SORT_BY:
      let sortedBooks = [...state.bookSorted];
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
      const genre = state.genre;
      let languageFilteredBooks = [...state.allBooks];
      if (genre.length !== 0) {
        const filteredBooksByLanguage = languageFilteredBooks.filter(
          (b) => b.language === selectedLanguage
        );
        const filteredBooksByLanguageWithGenre = filteredBooksByLanguage.filter(
          (b) => {
            return b.genres.some((genres) => genres.name === genre);
          }
        );
        return {
          ...state,
          bookSorted: filteredBooksByLanguageWithGenre,
          language: selectedLanguage,
        };
      } else {
        const filteredBooksByLanguage = languageFilteredBooks.filter(
          (b) => b.language === selectedLanguage
        );
        return {
          ...state,
          bookSorted: filteredBooksByLanguage,
          language: selectedLanguage,
        };
      }

    case TOTAL_ITEMS:
      totalItemsSold = action.payload.reduce((total, order) => {
        const itemsSold = order.items.reduce((acc, item) => {
          if (item.qty) {
            return acc + item.qty;
          }
          return acc;
        }, 0);

        return total + itemsSold;
      }, 0);

      return {
        ...state,
        dailySales: action.payload,
        totalItemsSold: totalItemsSold,
      };

    case GET_TOTAL_CHARGES:
      return {
        ...state,
        totalCharges: action.payload,
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
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        registrationError: null,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        registrationError: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_CARTS_DB:
      return {
        ...state,
        allCarts: action.payload,
      };
    case QUANTITY:
      const { id, qty } = action.payload;
      const cartQuantity = state.allQuantity;
      if (cartQuantity.length > 0) {
        const findBook = cartQuantity.find((b) => b.id === id);
        if (findBook) {
          const newAllQuantity = cartQuantity.filter((b) => b.id !== id);
          return {
            ...state,
            allQuantity: [...newAllQuantity, { id: id, qty: qty }],
            cart: state.cart.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  quantity: qty,
                };
              }
              return item;
            }),
            quantity: qty,
          };
        } else if (id === undefined) {
          return {
            ...state,
            quantity: qty,
          };
        } else {
          return {
            ...state,
            allQuantity: [...state.allQuantity, { id: id, qty: qty }],
            quantity: qty,
          };
        }
      } else if (id === undefined) {
        return {
          ...state,
          quantity: qty,
        };
      } else {
        return {
          ...state,
          allQuantity: [{ id: id, qty: qty }],
          quantity: qty,
        };
      }

    case GET_BEST_SELLERS:
      return {
        ...state,
        bestSellers: action.payload,
      };
    case GET_USER_BY_USERNAME:
      return {
        ...state,
        allUsers: action.payload
      };
     

    case UPDATE_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
}
