import {SET_PICTURE, SET_SCORE} from "../actions/actionTypes";

const initState = [
    {id: 0, pictureURI: null, score: null},
    {id: 1, pictureURI: null, score: null},
    {id: 2, pictureURI: null, score: null},
    {id: 3, pictureURI: null, score: null},
]

export default (state = initState, action) => {
    switch(action.type) {
        case SET_PICTURE:
            //console.log("action is", action)
            const updatedPicture = state.map(picture => {
                if(picture.id === action.id){
                    return { ...picture, ...action.payload }
                }
                return picture
            })
            return updatedPicture
        case SET_SCORE:
            //console.log("action is", action)
            const updatedScore = state.map(picture => {
                if(picture.id === action.id){
                    return { ...picture, ...action.payload }
                }
                return picture
            })
            return updatedScore
        default:
            return state;
    }
};