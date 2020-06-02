import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { LOGIN, LOGOUT, GET_ALL } from '../types'

export const register = async(user) => {
    return axios.post(API_URL + 'users/register', user)
}
export const login = async(user) => {
    const res = await axios.post(API_URL + 'users/login', user);
    store.dispatch({
        type: LOGIN,
        payload: res.data.user
    })
    localStorage.setItem('authToken', res.data.token);
    return res;
}
export const logout = async() => {
    const res = await axios.get(API_URL + 'users/logout', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        }
    })
    localStorage.removeItem('authToken');
    store.dispatch({
        type: LOGOUT
    })
    return res;
}
export const uploadImage = async(image) => {
    try {
        const res = await axios.post(API_URL + 'users/image', image, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'UPLOAD_IMAGE',
            payload: res.data
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}
export const getAll = async() => {
    const res = await axios.get(API_URL + 'users');
    store.dispatch({
        type: GET_ALL,
        payload: res.data
    })
    return res;
}
export const updateInfo = async(user) => {
    console.log(user);
    try {
        const res = await axios.put(API_URL + 'users/update', user, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'SET_USER',
            payload: res.data
        });
    } catch (error) {
        console.error(error)
    }
}
export const getUserInfo = async(user) => {
    const res = await axios.get(API_URL + 'users/user', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
    });
    store.dispatch({
        type: 'SET_USER',
        payload: res.data
    });
}