import request from '../utils/requests'
import { LOGIN, LOGOUT, GET_CURRENT_USER, SHOW_TOKEN_EXPIRE_NOTIFICATION } from '../utils/actions';
import { LOGIN_TOKEN_STORAGE } from '../utils/constants';

const authenticationActions = {};

authenticationActions.register = (data) => () => {
    return request.postApi('/api/register', data);
}

authenticationActions.login = (data) => (dispatch) => {
    request.post('/api/login', data, (response) => {
        localStorage.setItem(LOGIN_TOKEN_STORAGE, response.data.token);
        dispatch({ type: LOGIN, payload: { success: true } });
    }, (error) => {
        const errors = error && error.response && error.response.data && error.response.data.errors;
        dispatch({ type: LOGIN, payload: { success: false, errors } });
    });
}

authenticationActions.getUserData = () => (dispatch) => {
    request.get('/api/auth', {}, (response) => {
        dispatch({ type: GET_CURRENT_USER, payload: response.data });
    }, () => {
        dispatch({ type: GET_CURRENT_USER, payload: null });
    })
}

authenticationActions.logout = () => (dispatch) => {
    request.post('/api/logout', {}, () => {
        localStorage.removeItem(LOGIN_TOKEN_STORAGE);
        dispatch({ type: LOGOUT, payload: { success: true } });
    }, () => {
        dispatch({ type: LOGOUT, payload: { success: false } });
    })
}

authenticationActions.showTokenExpireNotification = () => dispatch => {
    dispatch({ type: SHOW_TOKEN_EXPIRE_NOTIFICATION })
}

export default authenticationActions;

