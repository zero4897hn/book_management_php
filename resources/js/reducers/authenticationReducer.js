import { REGISTER } from "../utils/actions";

const initialState = {
    loginErrors: null,
    isLogin: null,
    registerStatus: { success: null, errors: null }
}

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER: {
            const { success, errors } = payload;
            return {
                ...initialState,
                registerStatus: { success, errors }
            }
        }
        default: {
            return initialState;
        }
    }
}

export default authenticationReducer;
