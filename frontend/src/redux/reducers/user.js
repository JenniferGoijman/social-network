import { LOGIN, LOGOUT, GET_FOLLOWERS } from '../types'
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

        default:
            return state;
    }
};
export default userReducer;