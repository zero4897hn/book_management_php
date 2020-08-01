import request from '../utils/requests';
import { GET_USERS, GET_USER, DELETE_USER_BOOK } from '../utils/actions';

const userActions = {};

userActions.getUsers = () => (dispatch, getState) => {
    const { userReducer } = getState();
    const { page, pageSize } = userReducer;

    request.get('/api/users', {}, response => {
        const { data } = response;
        dispatch({
            type: GET_USERS,
            payload: {
                users: data.data,
                page: data.current_page,
                totalRecord: data.total,
                pageSize: data.per_page
            }
        });
    }, () => {
        dispatch({
            type: GET_USERS,
            payload: {
                users: []
            }
        });
    })
}

userActions.getUser = userId => dispatch => {
    request.get(`/api/users/${userId}`, {}, response => {
        dispatch({ type: GET_USER, payload: response.data });
    }, () => {
        dispatch({ type: GET_USER, payload: {} });
    })
}

userActions.deleteUserBook = bookId => dispatch => {
    request.delete(`/api/books/${bookId}`, {}, () => {
        dispatch({ type: DELETE_USER_BOOK, payload: { success: true, bookId } })
    }, () => {
        dispatch({ type: DELETE_USER_BOOK, payload: { success: false } })
    })
}

export default userActions;
