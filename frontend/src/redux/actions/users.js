import axios from 'axios';
import { API_URL } from '../../api-config';

export const register = async(user) => {
    return axios.post(API_URL + 'users/register', user)
}