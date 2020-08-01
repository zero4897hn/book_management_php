const { GET_USERS, GET_USER, DELETE_USER_BOOK } = require("../utils/actions");

const initialState = {
    users: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    user: {},
    deleteUserBookResponse: { success: null },
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
        case DELETE_USER_BOOK: {
            const { success, bookId } = payload;
            if (success) {
                const user = { ...state.user };
                user.books = user.books.filter(item => item.id !== bookId);
                return {
                    ...state,
                    user,
                    deleteUserBookResponse: { success: true }
                }
            }
            return {
                ...state,
                deleteUserBookResponse: { success: false }
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
