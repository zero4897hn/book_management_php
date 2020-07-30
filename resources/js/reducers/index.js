import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import bookReducer from './bookReducer';

export default combineReducers({
    authenticationReducer,
    bookReducer
});
