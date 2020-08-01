import axios from 'axios';
import { LOGIN_TOKEN_STORAGE } from './constants';
import store from './store';
import authenticationActions from '../actions/authenticationActions';

const request = {};

const getHeaders = () => {
    const headers = {};

    if (getToken()) {
        headers['Authorization'] = `Bearer ${getToken()}`;
    }

    headers['Accept'] = 'application/json';

    return headers;
}

const getToken = () => {
    return localStorage.getItem(LOGIN_TOKEN_STORAGE);
}

const logError = (onError) => {
    localStorage.removeItem(LOGIN_TOKEN_STORAGE);
    store.dispatch(authenticationActions.showTokenExpireNotification());
    onError();
}

const onErrorHandler = async (error, method, url, params, onSuccess, onError) => {
    const errorData = error && error.response && error.response.data;
    console.log(error && error.response);
    try {
        const { message } = errorData;
        switch (message) {
            case 'Token has expired': {
                await axios.post('/api/token/refresh', {}, { headers: getHeaders() });
                request[method](url, params, onSuccess, onError);
            }
            default: {
                onError();
            }
        }
    } catch (error) {
        console.log(error && error.response);
        logError(onError);
    }
}

request.get = (url, params = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.get(url, { params: { ...params }, headers: getHeaders() }).then(
        onSuccess,
        (error) => onErrorHandler(error, 'get', url, params, onSuccess, onError)
    );
}

request.post = (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.post(url, data, { headers: getHeaders() }).then(
        onSuccess,
        (error) => onErrorHandler(error, 'post', url, data, onSuccess, onError)
    );
}

request.put = (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.put(url, data, { headers: getHeaders() }).then(
        onSuccess,
        (error) => onErrorHandler(error, 'put', url, data, onSuccess, onError)
    );
}

request.delete = (url, params = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.delete(url, { params: { ...params }, headers: getHeaders() }).then(
        onSuccess,
        (error) => onErrorHandler(error, 'delete', url, params, onSuccess, onError)
    );
}

request.getApi = (url, params = {}) => {
    return axios.get(url, { params: { ...params }, headers: getHeaders() });
}

request.postApi = (url, data = {}) => {
    return axios.post(url, data, { headers: getHeaders() });
}

request.putApi = (url, data = {}) => {
    return axios.put(url, data, { headers: getHeaders() });
}

request.deleteApi = (url, params = {}) => {
    return axios.delete(url, { params: { ...params }, headers: getHeaders() });
}

export default request;
