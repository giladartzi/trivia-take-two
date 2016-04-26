import * as rest from '../utils/rest';

export const INCOMING_INVITATION_ACCEPT_REQUEST = 'INCOMING_INVITATION_ACCEPT_REQUEST';
export const INCOMING_INVITATION_ACCEPT_SUCCESS = 'INCOMING_INVITATION_ACCEPT_SUCCESS';
export const INCOMING_INVITATION_ACCEPT_FAILURE = 'INCOMING_INVITATION_ACCEPT_FAILURE';

export const INCOMING_INVITATION_REJECT_REQUEST = 'INCOMING_INVITATION_REJECT_REQUEST';
export const INCOMING_INVITATION_REJECT_SUCCESS = 'INCOMING_INVITATION_REJECT_SUCCESS';
export const INCOMING_INVITATION_REJECT_FAILURE = 'INCOMING_INVITATION_REJECT_FAILURE';

export const INCOMING_INVITATION_RECEIVED = 'INCOMING_INVITATION_RECEIVED';

let incomingInvitationAcceptRequest = (payload) => {
    return {
        type: INCOMING_INVITATION_ACCEPT_REQUEST,
        payload
    };
};

let incomingInvitationAcceptSuccess = (payload) => {
    return {
        type: INCOMING_INVITATION_ACCEPT_SUCCESS,
        payload
    }
};

let incomingInvitationAcceptFailure = (error) => {
    return {
        type: INCOMING_INVITATION_ACCEPT_FAILURE,
        error
    }
};

export function incomingInvitationAccept(payload) {
    return (dispatch) => {
        dispatch(incomingInvitationAcceptRequest(payload));

        rest.post('/incomingInvitation', Object.assign({}, payload, { accepted: true }))
            .then(json => dispatch(incomingInvitationAcceptSuccess(json)))
            .catch(error => dispatch(incomingInvitationAcceptFailure(error)));
    }
}

let incomingInvitationRejectRequest = (payload) => {
    return {
        type: INCOMING_INVITATION_REJECT_REQUEST,
        payload
    };
};

let incomingInvitationRejectSuccess = (payload) => {
    return {
        type: INCOMING_INVITATION_REJECT_SUCCESS,
        payload
    }
};

let incomingInvitationRejectFailure = (error) => {
    return {
        type: INCOMING_INVITATION_REJECT_FAILURE,
        error
    }
};

export function incomingInvitationReject(payload) {
    return (dispatch) => {
        dispatch(incomingInvitationRejectRequest(payload));

        rest.post('/incomingInvitation', Object.assign({}, payload, { accepted: false }))
            .then(json => dispatch(incomingInvitationRejectSuccess(json)))
            .catch(error => dispatch(incomingInvitationRejectFailure(error)));
    }
}