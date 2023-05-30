import { GET_BOOKS } from "../actions/actionsTypes";

const initialState = {
  allBooks: [],
  details: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {

        case GET_BOOKS:
            return {
                ...state,
                allBooks: payload,
            };

        case GET_DETAILS: 
            return {
                ...state,
                details: payload,
            }
        
        case CLEAR_DETAILS:
            return {
                ...state,
                details: [],
            } 

        default:
            return state;
        }
}
