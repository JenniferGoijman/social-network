import { LOGIN, LOGOUT } from '../types'
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case LOGOUT:
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
};
export default userReducer;