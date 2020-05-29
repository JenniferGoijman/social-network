import { LOGIN, LOGOUT, GET_FOLLOWERS, GET_FOLLOWINGS } from '../types'
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case LOGOUT:
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                user: action.payload
            }
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case GET_FOLLOWINGS:
            return {
                ...state,
                followings: action.payload
            }

        default:
            return state;
    }
};
export default userReducer;