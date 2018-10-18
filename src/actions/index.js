import {GENERATE_COLOR, SET_MAX_SCORE, SET_PICTURE, SET_SCORE} from "./actionTypes";

export function setCurrentColor(colorId) {
    return {
        type: GENERATE_COLOR,
        payload: colorId
    }
}

export function setMaxScore(score) {
    return {
        type: SET_MAX_SCORE,
        payload: score
    }
}

export function setPictureAction(id,uri) {
    return {
        type: SET_PICTURE,
        payload: { pictureURI: uri},
        id: id
    }
}

export function setPictureScore(id,score) {
    return {
        type: SET_SCORE,
        payload: { score: score},
        id: id
    }
}