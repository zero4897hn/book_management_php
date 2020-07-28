import { REGISTER, LOGIN } from "../utils/actions";

const initialState = {
    loginResponse: { success: null, errors: null },
    isLogin: null,
    registerResponse: { success: null, errors: null }
}

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER: {
            const { success, errors } = payload;
            return {
                ...initialState,
                registerResponse: { success, errors }
            }
        }
        case LOGIN: {
            const { success, errors } = payload;
            return {
                ...initialState,
                loginResponse: { success, errors }
            }
        }
        default: {
            return initialState;
        }
    }
}

export default authenticationReducer;
