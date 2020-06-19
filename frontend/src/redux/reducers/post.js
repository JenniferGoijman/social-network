import { GET_ALL_POSTS, GET_ONE_POST, CLEAN_UP } from '../types'

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
        case CLEAN_UP:
            return {
                ...state,
                posts: action.payload
            }
        case GET_ONE_POST:
            return {
                ...state,
                post:action.payload
            }
        default:
            return state;
    }
};
export default postReducer;