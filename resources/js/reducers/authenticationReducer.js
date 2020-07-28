import { REGISTER, LOGIN, RESET_AUTHENTICATION_STATE, LOGOUT } from "../utils/actions";

const initialState = {
    loginResponse: { success: null, errors: null },
    registerResponse: { success: null, errors: null },
    userData: null,
    isLogin: null
}

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER: {
            const { success, errors } = payload;
            return {
                ...state,
                registerResponse: { success, errors }
            }
        }
        case LOGIN: {
            const { success, errors } = payload;
            return {
                ...state,
                loginResponse: { success, errors },
            }
        }
        case RESET_AUTHENTICATION_STATE:
        case LOGOUT: {
            return {
                ...initialState
            }
        }
        default: {
            return initialState;
        }
    }
}

export default authenticationReducer;
