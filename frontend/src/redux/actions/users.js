import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { LOGIN } from '../types'

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