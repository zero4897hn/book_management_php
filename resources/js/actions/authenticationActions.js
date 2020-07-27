import request from '../utils/requests'
import { REGISTER } from '../utils/actions';

const authenticationActions = {};

authenticationActions.register = (data) => (dispatch) => {
    request.post('/register', data, () => {
        dispatch({ type: REGISTER, payload: { success: true } })
    }, (error) => {
        const errors = error && error.response && error.response.data && error.response.data.errors;
        dispatch({ type: REGISTER, payload: { success: false, errors } })
    });
}

export default authenticationActions;

