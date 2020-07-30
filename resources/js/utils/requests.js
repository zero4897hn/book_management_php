import axios from 'axios';
import { LOGIN_TOKEN_STORAGE } from './constants';

const request = {}

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
    }
}

const getToken = () => {
    return localStorage.getItem(LOGIN_TOKEN_STORAGE);
}

request.get = (url, params = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.get(url, { params: { ...params }, headers: getHeaders() }).then(onSuccess, onError);
}

request.post = (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.post(url, data, { headers: getHeaders() }).then(onSuccess, onError);
}

request.put = (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.put(url, data, { headers: getHeaders() }).then(onSuccess, onError);
}

request.delete = (url, params = {}, onSuccess = () => { }, onError = () => { }) => {
    axios.delete(url, { params: { ...params }, headers: getHeaders() }).then(onSuccess, onError);
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
