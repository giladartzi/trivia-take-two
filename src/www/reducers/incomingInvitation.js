import * as actions from '../actions/incomingInvitation';

let reducer = (state = { pending: false, invitationPending: false, invitationAccepted: false }, action) => {
    switch (action.type) {
        case actions.INCOMING_INVITATION_ACCEPT_REQUEST:
            return Object.assign({}, state, {
                pending: true
            });
        case actions.INCOMING_INVITATION_ACCEPT_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                invitationPending: false,
                invitationAccepted: true
            });
        case actions.INCOMING_INVITATION_ACCEPT_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                invitationPending: false,
                error: action.error.message
            });
        case actions.INCOMING_INVITATION_RECEIVED:
            return Object.assign({}, state, {
                invitationPending: true,
                inviter: action.payload.inviter
            });
        default:
            return state;
    }
};

export default reducer;