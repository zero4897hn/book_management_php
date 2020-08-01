import { LOGIN, LOGOUT, GET_CURRENT_USER, SHOW_TOKEN_EXPIRE_NOTIFICATION } from "../utils/actions";

const initialState = {
    loginResponse: { errors: null },
    userData: null,
    isLogin: null,
    tokenExpire: { show: null }
}

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN: {
            const { success, errors } = payload;
            return {
                ...state,
                loginResponse: { errors },
                isLogin: success
            }
        }
        case GET_CURRENT_USER: {
            return {
                ...state,
                isLogin: !!payload,
                userData: payload
            }
        }
        case LOGOUT: {
            window.location.href = '/login';
            return {
                ...state,
                ...initialState,
                isLogin: !success
            }
        }
        case SHOW_TOKEN_EXPIRE_NOTIFICATION: {
            return {
                ...state,
                tokenExpire: { show: true }
            }
        }
        default: {
            return state;
        }
    }
}

export default authenticationReducer;
