import {combineReducers} from "redux";
import CurrentColorReducer from "./CurrentColorReducer";
import MaxScoreReducer from "./MaxScoreReducer";
import SetPictureReducer from "./SetPictureReducer";

export default combineReducers({
    currentColor: CurrentColorReducer,
    maxScore: MaxScoreReducer,
    pictures: SetPictureReducer
})