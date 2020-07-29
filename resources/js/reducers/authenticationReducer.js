import { LOGIN, LOGOUT } from "../utils/actions";

const initialState = {
    loginResponse: { success: null, errors: null },
    userData: null
}

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN: {
            const { success, errors } = payload;
            return {
                ...state,
                loginResponse: { success, errors },
            }
        }
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
