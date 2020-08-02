const { GET_USERS, GET_USER, DELETE_USER_BOOK, BLOCK_USER, UNBLOCK_USER } = require("../utils/actions");

const initialState = {
    users: [],
    page: 1,
    pageSize: 10,
    totalRecord: 0,
    user: {},
    deleteUserBookResponse: { success: null },
    blockResponse: { success: null },
    unblockResponse: { success: null },
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
        case BLOCK_USER: {
            const { success, userId, banExpiredAt } = payload;
            if (success) {
                const users = state.users.map(
                    item => item.id === userId? { ...item, banned: true, ban_expired_at: banExpiredAt } : item
                );
                return {
                    ...state,
                    blockResponse: { success: true },
                    users
                }
            }
            return { ...state, blockResponse: { success: false }, };
        }
        case UNBLOCK_USER: {
            const { success, userId } = payload;
            if (success) {
                const users = state.users.map(
                    item => item.id === userId? { ...item, banned: false, ban_expired_at: null } : item
                );
                return {
                    ...state,
                    unblockResponse: { success: true },
                    users
                }
            }
            return { ...state, unblockResponse: { success: false }, };
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
