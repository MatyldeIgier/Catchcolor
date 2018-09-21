import {GENERATE_COLOR} from "../actions/actionTypes";

export default (state = null, action) => {
    switch(action.type) {
        case GENERATE_COLOR:
            return action.payload;
        default:
            return state;
    }
};