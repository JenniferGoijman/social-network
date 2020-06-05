import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { UPLOAD_IMAGE, GET_ALL_POSTS } from '../types'

export const uploadPostImage = async(post) => {
    try {
        const res = await axios.post(API_URL + 'posts/postImage', post, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        console.log(res);
        store.dispatch({
            type: UPLOAD_IMAGE,
            payload: res.data
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}
export const getFeed = async() => {
    const res = await axios.get(API_URL + 'posts', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        }
    });
    store.dispatch({
        type: GET_ALL_POSTS,
        payload: res.data
    })
    return res;
}