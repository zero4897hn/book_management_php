import request from "../utils/requests";
import { GET_BOOKS, SET_BOOKS_PAGE, GET_BOOK, RATE_BOOK } from "../utils/actions";

const bookActions = {};

bookActions.getBooks = () => (dispatch, getState) => {
    const { bookReducer } = getState();
    const { page, pageSize } = bookReducer;

    request.get('/api/books', { page, pageSize }, (response) => {
        const { data } = response;
        dispatch({
            type: GET_BOOKS,
            payload: {
                books: data.data,
                page: data.current_page,
                totalRecord: data.total,
                pageSize: data.per_page
            }
        })
    }, (error) => {
        console.log(error);
        dispatch({
            type: GET_BOOKS,
            payload: {
                books: [],
            }
        })
    })
}

bookActions.setPage = page => dispatch => {
    dispatch({ type: SET_BOOKS_PAGE, payload: page });
}

bookActions.rateBook = (data) => dispatch => {
    request.post('/api/rating', data, response => {
        dispatch({ type: RATE_BOOK, payload: { success: true, data: response.data } });
    }, error => {
        console.log(error);
        dispatch({ type: RATE_BOOK, payload: { success: false, data: null } });
    });
}

bookActions.getBook = id => (dispatch) => {
    request.get(`/api/books/${id}`, {}, response => {
        dispatch({ type: GET_BOOK, payload: response.data })
    }, () => {
        dispatch({ type: GET_BOOK, payload: {} })
    });
}

export default bookActions;
