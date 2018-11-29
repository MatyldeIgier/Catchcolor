import {SET_SCORE, SET_MAX_SCORE} from "../actions/actionTypes";

const initState = {
    maxScore: 0
}

export default (state = initState, action) => {
    switch(action.type) {
        case SET_MAX_SCORE:
            console.log("set max score");
            return { 
                maxScore: action.payload.score
            }
        default:
            return state;
    }
};