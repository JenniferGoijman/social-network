import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { LOGIN, LOGOUT, GET_ALL, UPLOAD_IMAGE, SET_CURRENT_USER, SET_MY_USER } from '../types'

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
export const resetPassword = async(id, password) => {
    try {
        return axios.put(API_URL + 'users/resetPassword/' + id, password);
    } catch (error) {
        console.error(error)
    }
}
export const uploadProfileImage = async(image) => {
    try {
        const res = await axios.post(API_URL + 'users/profileImage', image, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: UPLOAD_IMAGE,
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
            type: SET_MY_USER,
            payload: res.data
        });
    } catch (error) {
        console.error(error)
    }
}
export const getMyUser = async() => {
    const res = await axios.get(API_URL + 'users/user', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
    });
    store.dispatch({
        type: SET_MY_USER,
        payload: res.data
    });
}
export const getById = async(id) => {
    const res = await axios.get(API_URL + 'users/byId/' + id, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
    });
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
    })
    return res;
}
export const getByUsername = async(username) => {
    const res = await axios.get(API_URL + 'users/byUsername/' + username, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
    });

    store.dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
    })
    return res;
}
export const follow = async(followerFollowed) => {
    await axios.post(API_URL + 'followers/follow', followerFollowed);
    return getMyUser();
}
export const unfollow = async(follower_id, followed_id) => {
    await axios.get(API_URL + 'followers/unfollow/' + follower_id + '/'+ followed_id);
    return getMyUser();
}