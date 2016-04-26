import * as actions from '../actions/outgoingInvitation';

let reducer = (state = { pending: false, invitationPending: false, invitationAccepted: false }, action) => {
    switch (action.type) {
        case actions.OUTGOING_INVITATION_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                error: null,
                invitationPending: true,
                invitee: action.payload.invitee
            });
        case actions.OUTGOING_INVITATION_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                error: null
            });
        case actions.OUTGOING_INVITATION_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                error: action.error.message,
                invitationPending: false
            });
        case actions.OUTGOING_INVITATION_ACCEPTED:
            return Object.assign({}, state, {
                invitationPending: false,
                invitationAccepted: true
            });
        case actions.OUTGOING_INVITATION_REJECTED:
            return Object.assign({}, state, {
                invitationPending: false,
                invitationAccepted: false
            });
        default:
            return state;
    }
};

export default reducer;