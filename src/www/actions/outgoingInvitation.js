import * as rest from '../utils/rest';

export const OUTGOING_INVITATION_REQUEST = 'OUTGOING_INVITATION_REQUEST';
export const OUTGOING_INVITATION_SUCCESS = 'OUTGOING_INVITATION_SUCCESS';
export const OUTGOING_INVITATION_FAILURE = 'OUTGOING_INVITATION_FAILURE';

export const OUTGOING_INVITATION_ACCEPTED = 'OUTGOING_INVITATION_ACCEPTED';
export const OUTGOING_INVITATION_REJECTED = 'OUTGOING_INVITATION_REJECTED';

// export const OUTGOING_INVITATION_CANCEL_REQUEST = 'OUTGOING_INVITATION_CANCEL_REQUEST';
// export const OUTGOING_INVITATION_CANCEL_SUCCESS = 'OUTGOING_INVITATION_CANCEL_SUCCESS';
// export const OUTGOING_INVITATION_CANCEL_FAILURE = 'OUTGOING_INVITATION_CANCEL_FAILURE';

let outgoingInvitationRequest = (payload) => {
    return {
        type: OUTGOING_INVITATION_REQUEST,
        payload
    };
};

let outgoingInvitationSuccess = (payload) => {
    return {
        type: OUTGOING_INVITATION_SUCCESS,
        payload
    }
};

let outgoingInvitationFailure = (error) => {
    return {
        type: OUTGOING_INVITATION_FAILURE,
        error
    }
};

export function outgoingInvitation(payload) {
    return (dispatch) => {
        dispatch(outgoingInvitationRequest(payload));

        rest.post('/outgoingInvitation', payload)
            .then(json => dispatch(outgoingInvitationSuccess(json)))
            .catch(error => dispatch(outgoingInvitationFailure(error)));
    }
}