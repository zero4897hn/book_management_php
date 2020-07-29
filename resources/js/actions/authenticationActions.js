import request from '../utils/requests'
import { REGISTER, LOGIN, RESET_AUTHENTICATION_STATE, LOGOUT } from '../utils/actions';
import { LOGIN_TOKEN_STORAGE } from '../utils/constants';

const authenticationActions = {};

authenticationActions.register = (data) => (dispatch) => {
    return request.postApi('/register', data)
    // , () => {
    //     dispatch({ type: REGISTER, payload: { success: true } })
    // }, (error) => {
    //     const errors = error && error.response && error.response.data && error.response.data.errors;
    //     dispatch({ type: REGISTER, payload: { success: false, errors } })
    // });
}

authenticationActions.login = (data) => (dispatch) => {
    request.post('/login', data, (response) => {
        localStorage.setItem(LOGIN_TOKEN_STORAGE, response.data.token);
        dispatch({ type: LOGIN, payload: { success: true } })
    }, (error) => {
        const errors = error && error.response && error.response.data && error.response.data.errors;
        dispatch({ type: LOGIN, payload: { success: false, errors } })
    });
}

authenticationActions.resetState = (data) => (dispatch) => {
    dispatch({ type: RESET_AUTHENTICATION_STATE })
}

authenticationActions.getUserData = () => (dispatch) => {
    request.get('auth', {}, (response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    })
}

authenticationActions.logout = () => (dispatch) => {
    request.post('logout', {}, (response) => {
        console.log(response);
        localStorage.removeItem(LOGIN_TOKEN_STORAGE);
        dispatch({ type: LOGOUT, payload: { success: true } });
    }, (error) => {
        console.log(error);
        localStorage.removeItem(LOGIN_TOKEN_STORAGE);
        dispatch({ type: LOGOUT, payload: { success: false } });
    })
}

export default authenticationActions;

