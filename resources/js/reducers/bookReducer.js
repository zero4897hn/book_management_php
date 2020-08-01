import { GET_BOOKS, SET_BOOKS_PAGE, GET_BOOK, RATE_BOOK, GET_COMMENT, EDIT_COMMENT, ADD_COMMENT, DELETE_COMMENT } from "../utils/actions";
import { isEmpty } from "lodash";

const initialState = {
    books: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    book: {},
    rateResponse: { success: null },
    editCommentResponse: { success: null },
    addCommentResponse: { success: null },
    deleteCommentResponse: { success: null },
    comment: null
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
        case GET_BOOK: {
            return {
                ...state,
                book: payload,
            }
        }
        case RATE_BOOK: {
            const { success, data } = payload;
            return {
                ...state,
                rateResponse: { success },
                book: {
                    ...state.book,
                    current_rate: data.rate,
                    rating: data.totalRating
                }
            }
        }
        case GET_COMMENT: {
            return {
                ...state,
                comment: payload,
            }
        }
        case ADD_COMMENT: {
            const { success, data } = payload;
            if (success) {
                const book = { ...state.book };
                book.comments = [...book.comments, data];
                return {
                    ...state,
                    book,
                    addCommentResponse: { success: true }
                }
            }
            return {
                ...state,
                addCommentResponse: { success: false }
            }
        }
        case EDIT_COMMENT: {
            const { success, data } = payload;
            if (success) {
                const book = { ...state.book };
                book.comments = book.comments.map(item => item.id === data.id? data : item);
                return {
                    ...state,
                    book,
                    editCommentResponse: { success: true }
                }
            }
            return {
                ...state,
                editCommentResponse: { success: false }
            }
        }
        case DELETE_COMMENT: {
            const { success, commentId } = payload;
            if (success) {
                const book = { ...state.book };
                book.comments = book.comments.filter(item => item.id !== commentId);
                return {
                    ...state,
                    book,
                    deleteCommentResponse: { success: true }
                }
            }
            return {
                ...state,
                deleteCommentResponse: { success: false }
            }
        }
        default: {
            return state;
        }
    }
}

export default bookReducer;
