import request from '../utils/requests'
import { REGISTER, LOGIN } from '../utils/actions';

const authenticationActions = {};

authenticationActions.register = (data) => (dispatch) => {
    request.post('/register', data, () => {
        dispatch({ type: REGISTER, payload: { success: true } })
    }, (error) => {
        const errors = error && error.response && error.response.data && error.response.data.errors;
        dispatch({ type: REGISTER, payload: { success: false, errors } })
    });
}

authenticationActions.login = (data) => (dispatch) => {
    request.post('/login', data, () => {
        dispatch({ type: LOGIN, payload: { success: true } })
    }, (error) => {
        const errors = error && error.response && error.response.data && error.response.data.errors;
        dispatch({ type: LOGIN, payload: { success: false, errors } })
    });
}

export default authenticationActions;

