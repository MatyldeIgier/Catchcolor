import {combineReducers} from "redux";
import CurrentColorReducer from "./CurrentColorReducer";
import MaxScoreReducer from "./MaxScoreReducer";

export default combineReducers({
    currentColor: CurrentColorReducer,
    maxScore: MaxScoreReducer
})