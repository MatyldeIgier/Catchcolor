import {GENERATE_COLOR, SET_MAX_SCORE} from "./actionTypes";

export function currentColor(colorId) {
    return {
        type: GENERATE_COLOR,
        payload: colorId
    }
}

export function maxScore(score) {
    return {
        type: SET_MAX_SCORE,
        payload: score
    }
}