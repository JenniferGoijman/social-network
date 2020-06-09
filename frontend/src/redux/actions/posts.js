import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { GET_ALL_POSTS } from '../types'
import { getById } from './users';

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
export const getPostById = async(post_id) => {
    try {
        const res = await axios.get(API_URL + 'posts/post/' + post_id, {
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
export const like = async(post_id, user_id) => {
    console.log(post_id, user_id);
    try {
        await axios.get(API_URL + 'posts/like/' + post_id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        if (user_id !== null) {
            return getById(user_id);
        } else{
            return getFeed();
        }
    } catch (error) {
        console.error(error)
    }    
}
export const unlike = async(post_id, user_id) => {
    try {
        await axios.get(API_URL + 'posts/unlike/' + post_id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        if (user_id !== null) {
            return getById(user_id);
        } else{
            return getFeed();
        }
    } catch (error) {
        console.error(error)
    }     
}
export const insertComment = async(comment, user_id) => {
    try {
        await axios.post(API_URL + 'posts/comment', comment, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        if (user_id !== null) {
            return getById(user_id);
        } else{
            return getFeed();
        }
    } catch (error) {
        console.error(error)
    }    
}