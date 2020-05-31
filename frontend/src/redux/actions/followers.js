import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';
import { GET_FOLLOWERS, GET_FOLLOWINGS } from '../types'

export const getFollowers = async(id, itsMe) => {
    try {
        const res = await axios.get(API_URL + 'users/followers/' + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        if (itsMe){
            store.dispatch({
                type: 'GET_MY_FOLLOWERS',
                payload: res.data
            })
        } else {
            store.dispatch({
                type: GET_FOLLOWERS,
                payload: res.data
            })
        }
    } catch (error) {
        console.error(error)
    }
}
export const getFollowings = async(id, itsMe) => {
    try {
        const res = await axios.get(API_URL + 'users/followings/' + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('authToken')
            }
        });
        if (itsMe) {
            store.dispatch({
                type: 'GET_MY_FOLLOWINGS',
                payload: res.data
            })
        } else {
            store.dispatch({
                type: GET_FOLLOWINGS,
                payload: res.data
            })
        }
        
    } catch (error) {
        console.error(error)
    }
}
export const follow = async(followerFollowed) => {
    await axios.post(API_URL + 'followers/follow', followerFollowed);
    return getFollowings(followerFollowed.follower_id, true);
}
export const unfollow = async(follower_id, followed_id) => {
    await axios.get(API_URL + 'followers/unfollow/' + follower_id + '/'+ followed_id);
    return getFollowings(follower_id, true);
}