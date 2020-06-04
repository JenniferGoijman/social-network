import { LOGIN, LOGOUT, GET_ALL, UPLOAD_IMAGE, SET_CURRENT_USER, SET_MY_USER } from '../types'
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                users: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGIN:
        case LOGOUT:
        case UPLOAD_IMAGE:
        case SET_MY_USER:
            return {
                ...state,
                myUser: action.payload
            }
        default:
            return state;
    }
};
export default userReducer;