import axios from "axios";
import { GET_BOOKS } from "./actionsTypes";

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
}
