import request from "../utils/requests";
import { GET_BOOKS, SET_BOOKS_PAGE, GET_BOOK, RATE_BOOK, GET_COMMENT, EDIT_COMMENT, ADD_COMMENT, DELETE_COMMENT } from "../utils/actions";

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
    }, () => {
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
    }, () => {
        dispatch({ type: RATE_BOOK, payload: { success: false, data: {} } });
    });
}

bookActions.getBook = id => (dispatch) => {
    request.get(`/api/books/${id}`, {}, response => {
        dispatch({ type: GET_BOOK, payload: response.data });
    }, () => {
        dispatch({ type: GET_BOOK, payload: {} });
    });
}

bookActions.getComment = id => dispatch => {
    request.get(`/api/comments/${id}`, {}, response => {
        dispatch({ type: GET_COMMENT, payload: response.data });
    }, () => {
        dispatch({ type: GET_COMMENT, payload: {} });
    })
}

bookActions.addComment = data => dispatch => {
    request.post('/api/comments', data, response => {
        dispatch({ type: ADD_COMMENT, payload: { success: true, data: response.data } });
    }, () => {
        dispatch({ type: ADD_COMMENT, payload: { success: false } });
    })
}

bookActions.editComment = data => dispatch => {
    request.put(`/api/comments/${data.id}`, data, response => {
        dispatch({ type: EDIT_COMMENT, payload: { success: true, data: response.data } });
    }, () => {
        dispatch({ type: EDIT_COMMENT, payload: { success: false } });
    })
}

bookActions.deleteComment = commentId => dispatch => {
    request.delete(`/api/comments/${commentId}`, {}, () => {
        dispatch({ type: DELETE_COMMENT, payload: { success: true, commentId } })
    }, () => {
        dispatch({ type: DELETE_COMMENT, payload: { success: false } })
    })
}

export default bookActions;
