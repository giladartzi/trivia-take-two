import * as rest from '../utils/rest';

export const INVITE_REQUEST = 'INVITE_REQUEST';
export const INVITE_SUCCESS = 'INVITE_SUCCESS';
export const INVITE_FAILURE = 'INVITE_FAILURE';
export const INVITATION = 'INVITATION';
export const INVITATION_ACCEPTED = 'INVITATION_ACCEPTED';

let inviteRequest = (payload) => {
    return {
        type: INVITE_REQUEST,
        payload
    };
};

let inviteSuccess = (payload) => {
    return {
        type: INVITE_SUCCESS,
        payload
    }
};

let inviteFailure = (error) => {
    return {
        type: INVITE_FAILURE,
        error
    }
};

export function invite(dispatch, payload) {
    dispatch(inviteRequest(payload));

    rest.post('/invite', payload)
        .then(json => dispatch(inviteSuccess(json)))
        .catch(error => dispatch(inviteFailure(error)));
}