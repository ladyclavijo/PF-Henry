import { GET_BOOKS } from "../actions/actionsTypes";

const initialState = {
  allBooks: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        allBooks: payload,
      };
    default:
      return state;
  }
}
