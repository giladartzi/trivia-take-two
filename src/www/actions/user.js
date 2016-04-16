import { push } from 'react-router-redux';

import * as rest from '../utils/rest';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const LOGOUT = 'LOGOUT';

let registerRequest = ({ username, password }) => {
    return {
        type: REGISTER_REQUEST,
        username,
        password
    };
};

let registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    }
};

let registerFailure = (error) => {
    return {
        type: REGISTER_FAILURE,
        error
    }
};

let authenticateRequest = ({ username, password }) => {
    return {
        type: AUTHENTICATE_REQUEST,
        username,
        password
    };
};

let authenticateSuccess = (payload) => {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload
    }
};

let authenticateFailure = (error) => {
    return {
        type: AUTHENTICATE_FAILURE,
        error
    }
};

let logoutAction = () => {
    return {
        type: LOGOUT
    }
};

let handleToken = (json, dispatch) => {
    if (json && json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        dispatch(push('/'));
    }

    return json;
};

export function register(dispatch, payload) {
    dispatch(registerRequest(payload));

    rest.post('/register', payload)
        .then(json => { dispatch(registerSuccess(json)); return json; })
        .then(json => handleToken(json, dispatch))
        .catch(error => dispatch(registerFailure(error)));
}

export function authenticate(dispatch, payload) {
    dispatch(authenticateRequest(payload));

    rest.post('/authenticate', payload)
        .then(json => { dispatch(authenticateSuccess(json)); return json; })
        .then(json => handleToken(json, dispatch))
        .catch(error => dispatch(authenticateFailure(error)));
}

export function logout() {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutAction());
        dispatch(push('/authenticate'));
    }
}