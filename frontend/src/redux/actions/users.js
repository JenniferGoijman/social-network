import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { LOGIN, LOGOUT, GET_FOLLOWERS, GET_FOLLOWINGS, GET_ALL } from '../types'

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
export const uploadImage = async(id, image) => {
    try {
        const res = await axios.post(API_URL + 'users/image/'+ id, image, {
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
export const getFollowers = async(id) => {
    try {
        const res = await axios.get(API_URL + 'users/followers/' + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: GET_FOLLOWERS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
    }
}
export const getFollowings = async(id) => {
    try {
        const res = await axios.get(API_URL + 'users/followings/' + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: GET_FOLLOWINGS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
    }
}
export const getAll = async() => {
    const res = await axios.get(API_URL + 'users/');
    store.dispatch({
        type: GET_ALL,
        payload: res.data
    })
    return res;
}