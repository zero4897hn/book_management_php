import { SHOW_SUCCESS_TOAST } from "../utils/actions";

const initialState = {
    successResponse: null
}

const toastReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SHOW_SUCCESS_TOAST: {
            return {
                ...state,
                successResponse: payload
            }
        }
        default: {
            return initialState;
        }
    }
}

export default toastReducer;
