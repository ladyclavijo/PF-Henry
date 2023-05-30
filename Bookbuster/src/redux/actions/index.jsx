import axios from "axios";
import { GET_BOOKS,GET_BOOKS_BY_NAME } from "./actionsTypes";

export function getBooks() {
  return async function (dispatch) {
    const allBooks = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?maxResults=40&startIndex=0&q=flowers+inauthor:keyes&key=AIzaSyAOkpKXCbBqHIPdBUfdUcB8yeV6kCFUAvw"
    );
    return dispatch({
      type: GET_BOOKS,
      payload: allBooks.data,
    });
  };
};

export const getBooksByName = name => {
  return async function (dispatch) {
    try {
      const response = (await axios.get()).data //Falta url en axios.get para traer los libros por nombre.
      return dispatch({
        type:GET_BOOKS_BY_NAME,
        payload:response,
      });
    } catch (error) {
      console.log(error.message);
    };
  }
};
