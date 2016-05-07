import { push } from 'react-router-redux';
import * as rest from '../utils/rest';

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';

export const DISPLAY_GAME = 'DISPLAY_GAME';

let getQuestionRequest = (payload) => {
    return {
        type: GET_QUESTION_REQUEST,
        payload
    };
};

let getQuestionSuccess = (payload) => {
    return {
        type: GET_QUESTION_SUCCESS,
        payload
    }
};

let getQuestionFailure = (error) => {
    return {
        type: GET_QUESTION_FAILURE,
        error
    }
};

export function getQuestion(payload) {
    return (dispatch) => {
        dispatch(getQuestionRequest(payload));
    
        rest.post('/getQuestion', payload)
            .then(json => dispatch(getQuestionSuccess(json)))
            .catch(error => dispatch(getQuestionFailure(error)));
    }
}

let displayGameAction = () => {
    return {
        type: DISPLAY_GAME
    }
};

export function displayGame() {
    return (dispatch) => {
        dispatch(displayGameAction());
        dispatch(push('/game'));
    }
}