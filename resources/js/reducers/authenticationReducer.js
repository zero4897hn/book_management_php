import { LOGIN, LOGOUT, GET_CURRENT_USER } from "../utils/actions";

const initialState = {
    loginResponse: { success: null, errors: null },
    userData: null,
    isLogin: null
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
            const { success } = payload;
            return {
                ...state,
                ...initialState,
                isLogin: !success
            }
        }
        default: {
            return state;
        }
    }
}

export default authenticationReducer;
