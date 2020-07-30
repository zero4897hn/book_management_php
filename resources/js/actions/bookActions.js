import request from "../utils/requests";
import { GET_BOOKS, SET_BOOKS_PAGE } from "../utils/actions";

const bookActions = {};

bookActions.getBooks = () => (dispatch, getState) => {
    const { bookReducer } = getState();
    const { page, pageSize } = bookReducer;

    request.get('api/books', { page, pageSize }, (response) => {
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
    })
}

bookActions.setPage = page => dispatch => {
    dispatch({ type: SET_BOOKS_PAGE, payload: page });
}

bookActions.getBook = id => async () => {
    return request.getApi(`/api/books/${id}`, {});
}

export default bookActions;
