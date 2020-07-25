import axios from 'axios';

const request = {}

request.get = (url, params, onSuccess = () => { }, onError = () => { }) => {
    axios.get(url, { params, headers: {} }).then(onSuccess, onError);
}

request.post = (url, data, onSuccess = () => { }, onError = () => { }) => {
    axios.post(url, data, { headers: {} }).then(onSuccess, onError);
}

request.put = (url, data, onSuccess = () => { }, onError = () => { }) => {
    axios.put(url, data, { headers: {} }).then(onSuccess, onError);
}

request.delete = (url, params, onSuccess = () => { }, onError = () => { }) => {
    axios.delete(url, { params, headers: {} }).then(onSuccess, onError);
}

request.getApi = (url, params) => {
    return axios.get(url, { params, headers: {} });
}

request.postApi = (url, data) => {
    return axios.post(url, data, { headers: {} });
}

request.putApi = (url, data) => {
    return axios.put(url, data, { headers: {} });
}

request.deleteApi = (url, params) => {
    return axios.delete(url, { params, headers: {} });
}

export default request;
