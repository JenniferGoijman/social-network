import { LOGIN } from '../types'
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
};
export default userReducer;