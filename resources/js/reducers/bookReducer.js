import { GET_BOOKS, SET_BOOKS_PAGE } from "../utils/actions";

const initialState = {
    books: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0
}

const bookReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_BOOKS: {
            return {
                ...state,
                ...payload,
            }
        }
        case SET_BOOKS_PAGE: {
            return {
                ...state,
                page: payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default bookReducer;
