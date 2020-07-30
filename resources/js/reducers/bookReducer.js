import { GET_BOOKS, SET_BOOKS_PAGE, GET_BOOK, RATE_BOOK } from "../utils/actions";

const initialState = {
    books: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    book: {},
    rateResponse: { success: null }
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
            console.log(data);
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
        default: {
            return state;
        }
    }
}

export default bookReducer;
