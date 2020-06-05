import { GET_ALL_POSTS } from '../types'

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
};
export default postReducer;