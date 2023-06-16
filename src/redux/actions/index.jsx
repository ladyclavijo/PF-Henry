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
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_USERS,
  GET_BOOKS_BY_AUTHOR,
  ADD_TO_CART,
  UPDATE_USER,
  GET_USER_BY_ID,
  DELETE_FROM_CART,
  CLEAR_CART,
  GET_CARTS_DB,
  POST_CARTS_DB,
  UPDATE_CARTS_DB,
  DELETE_CARTS_DB,
  CLEAR_DETAIL
} from "./actionsTypes";

export const getBooks = () => {
  return async function (dispatch) {
    try {
      const allBooks = await axios.get("/books");
      return dispatch({
        type: GET_BOOKS,
        payload: allBooks.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getBooksByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/books?title=${name}`)).data;
      return dispatch({
        type: GET_BOOKS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getBooksByAuthor = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/books/?author=${name}`)).data;
      return dispatch({
        type: GET_BOOKS_BY_AUTHOR,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getBookDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/books/${id}`)).data;

      return dispatch({
        type: GET_BOOK_DETAIL,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createBooks = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let response = await axios.post("/books/post", payload);
      return dispatch({
        type: CREATE_BOOK,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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
  };
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
  };
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
  };
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
  };
};

export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

export const sortBy = (payload) => {
  return {
    type: SORT_BY,
    payload,
  };
};

export const filterByLanguages = (payload) => {
  return {
    type: FILTER_BY_LANGUAGES,
    payload,
  };
};

export const registerUser = (userData) => {
  console.log(userData);
  return async (dispatch) => {
    try {
      const response = await axios.post("/users/register", userData);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const getUsers = () => {
  return async function (dispatch) {
    try {
      const allUsers = await axios.get("/users");
      return dispatch({
        type: GET_USERS,
        payload: allUsers.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// cartItems.js

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const updateUser = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.put("/users/update", payload);
      return dispatch({
        type: UPDATE_USER,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
};

export const getUserDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/users/${id}`)).data;

      return dispatch({
        type: GET_USER_BY_ID,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteFromCart = (productId) => {
  return {
    type: DELETE_FROM_CART,
    payload: productId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const getCartsDB = () => {
  return async function (dispatch) {
    try {
      const allCarts = await axios.get("/carts");
      return dispatch({
        type: GET_CARTS_DB,
        payload: allCarts.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const postCarts = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let response = await axios.post("/carts", payload);
      return dispatch({
        type: POST_CARTS_DB,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
};

export const updateCarts = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.put("/carts", payload);
      return dispatch({
        type: UPDATE_CARTS_DB,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
};

export const deleteCarts = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let response = await axios.delete("/carts", { data: payload });
      return dispatch({
        type: DELETE_CARTS_DB,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
};
export const clearDetail = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_DETAIL,
    })
  };
};
