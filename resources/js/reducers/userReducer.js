const { GET_USERS } = require("../utils/actions");

const initialState = {
    users: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
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
        default: {
            return state;
        }
    }
}

export default userReducer;
