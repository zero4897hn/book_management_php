import request from '../utils/requests';
import { GET_USERS } from '../utils/actions';

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

export default userActions;
