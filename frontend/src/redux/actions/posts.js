import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { UPLOAD_IMAGE, DELETE_IMAGE, GET_ALL_POSTS } from '../types'

export const uploadPostImage = async(post) => {
    try {
        const res = await axios.post(API_URL + 'posts/postImage', post, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}
export const getFeed = async() => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}
export const deletePost = async(post_id) => {
    try {
        const res = await axios.delete(API_URL + 'posts/' + post_id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        return res;    
    } catch (error) {
        console.error(error)
    }    
}