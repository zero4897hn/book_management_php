import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import toastReducer from './toastReducer';

export default combineReducers({
    authenticationReducer,
    toastReducer,
});
