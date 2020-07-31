import { GET_BOOKS, SET_BOOKS_PAGE, GET_BOOK, RATE_BOOK, GET_COMMENT, EDIT_COMMENT } from "../utils/actions";
import { isEmpty } from "lodash";

const initialState = {
    books: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    book: {},
    rateResponse: { success: null },
    commentResponse: { success: null },
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
        case EDIT_COMMENT: {
            const { success, data } = payload;
            console.log(payload);
            if (success) {
                const book = { ...state.book }
                book.comments = book.comments.map(comment => comment.id === data.id? data : comment);
                console.log(book);
                return {
                    ...state,
                    book,
                    commentResponse: { success: true }
                }
            }
            return {
                ...state,
                commentResponse: { success: false }
            }
        }
        default: {
            return state;
        }
    }
}

export default bookReducer;
