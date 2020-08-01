const { GET_USERS, GET_USER } = require("../utils/actions");

const initialState = {
    users: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    user: {},
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS: {
            return {
                ...state,
                ...payload
            }
        }
        case GET_USER: {
            return {
                ...state,
                user: payload
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
