import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

const reducer = combineReducers({
    user,
    post
})
export default reducer;