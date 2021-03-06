import request from '../utils/requests';
import { GET_USERS, GET_USER, DELETE_USER_BOOK, BLOCK_USER, UNBLOCK_USER, SET_USERS_PAGE } from '../utils/actions';

const userActions = {};

userActions.getUsers = () => (dispatch, getState) => {
    const { userReducer } = getState();
    const { page, pageSize } = userReducer;

    request.get('/api/users', { page, pageSize }, response => {
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

userActions.addUser = formData => () => {
    return request.postApi('/api/users', formData);
}

userActions.getUserPromise = id => () => {
    return request.getApi(`/api/users/${id}`);
}

userActions.editUser = (id, formData) => () => {
    return request.postApi(`/api/users/update/${id}`, formData);
}

userActions.deleteUserBook = bookId => dispatch => {
    request.delete(`/api/books/${bookId}`, {}, () => {
        dispatch({ type: DELETE_USER_BOOK, payload: { success: true, bookId } })
    }, () => {
        dispatch({ type: DELETE_USER_BOOK, payload: { success: false } })
    })
}

userActions.blockUser = (userId, banExpiredAt) => dispatch => {
    request.post('/api/users/block', { user_id: userId, ban_expired_at: banExpiredAt }, () => {
        dispatch({ type: BLOCK_USER, payload: { success: true, userId, banExpiredAt } });
    }, () => {
        dispatch({ type: BLOCK_USER, payload: { success: false } });
    })
}

userActions.unblockUser = userId => dispatch => {
    request.post('api/users/unblock', { user_id: userId }, () => {
        dispatch({ type: UNBLOCK_USER, payload: { success: true, userId } });
    }, () => {
        dispatch({ type: UNBLOCK_USER, payload: { success: false } });
    })
}

userActions.setPage = page => dispatch => {
    dispatch({ type: SET_USERS_PAGE, payload: page });
}

export default userActions;
