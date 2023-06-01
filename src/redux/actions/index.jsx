import axios from "axios";
import {
  GET_BOOKS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAIL,
  CREATE_BOOK,
  CLEAR_FILTERS,
  PAGINATED,
  GET_ALL_GENRES,
} from "./actionsTypes";

export function getBooks() {
  return async function (dispatch) {
    const allBooks = await axios.get("/books");
    return dispatch({
      type: GET_BOOKS,
      payload: allBooks.data,
    });
  };
}

export const getBooksByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/books?name=${name}`)).data; //Falta url en axios.get para traer los libros por nombre.
      return dispatch({
        type: GET_BOOKS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getBookDetail = (id) => {
  return async function (dispatch) {
    const response = (await axios.get(`/books/${id}`)).data; //Falta url en axios.get para traer los libros por id.

    return dispatch({
      type: GET_BOOK_DETAIL,
      payload: response,
    });
  };
};

export const createBooks = (payload) => {
  return async function (dispatch) {
    const newBook = await axios.post(`/books`,payload); //Falta url en axios.post para crear los libros.
    return dispatch({
      type: CREATE_BOOK,
      payload: newBook.data,
    });
  };
};

export const clearFilters = (allBooks) => {
  return {
    type: CLEAR_FILTERS,
    payload: allBooks,
  };
};

export const getPages = (payload) => {
  return {
    type: PAGINATED,
    payload,
  };
};


export const getAllGenres = () => {
    return async function (dispatch) {
        try {
            const response = (await axios.get("/genres")).data;
            return dispatch({
                type: GET_ALL_GENRES,
                payload: response,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}