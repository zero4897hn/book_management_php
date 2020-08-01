import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import bookReducer from './bookReducer';
import userReducer from './userReducer';

export default combineReducers({
    authenticationReducer,
    bookReducer,
    userReducer,
});
