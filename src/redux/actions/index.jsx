import axios from "axios";
import {
  GET_BOOKS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAIL,
  CREATE_BOOK,
  CLEAR_FILTERS,
  PAGINATED,
  GET_ALL_GENRES,
  FILTER_BY_GENRES,
  SORT_BY,
  FILTER_BY_LANGUAGES,
  GET_GENRES_BY_ID,
  GET_AUTHORS,
  GET_AUTHORS_BY_ID,
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
      const response = (await axios.get(`/books?name=${name}`)).data; 
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
    const response = (await axios.get(`/books/${id}`)).data;

    return dispatch({
      type: GET_BOOK_DETAIL,
      payload: response,
    });
  };
};

export const createBooks = (payload) => {
  return async function (dispatch) {
    const newBook = await axios.post(`/books`,payload); 
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
};

export const getGenresById = (id) => {
  return async function (dispatch) {
      try {
          const response = (await axios.get(`/genres/${id}`)).data;
          return dispatch({
              type: GET_GENRES_BY_ID,
              payload: response,
          });
      } catch (error) {
          console.log(error.message);
      }
  }
};

export const getAuthor = () => {
  return async function (dispatch) {
      try {
          const response = (await axios.get(`/authors`)).data;
          return dispatch({
              type: GET_AUTHORS,
              payload: response,
          });
      } catch (error) {
          console.log(error.message);
      }
  }
};

export const getAuthorsById = (id) => {
  return async function (dispatch) {
      try {
          const response = (await axios.get(`/authors/${id}`)).data;
          return dispatch({
              type: GET_AUTHORS_BY_ID,
              payload: response,
          });
      } catch (error) {
          console.log(error.message);
      }
  }
};



export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  }
};

export const sortBy = (payload) => {
  return {
    type: SORT_BY,
    payload
  }
};

export const filterByLanguages = (payload) => {
  return {
    type: FILTER_BY_LANGUAGES,
    payload
  }
};

