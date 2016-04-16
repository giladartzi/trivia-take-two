import * as actions from '../actions/invite';

let reducer = (state = { pending: false, invitedBy: null, invitationPending: false, invitationAccepted: false }, action) => {
    switch (action.type) {
        case actions.INVITE_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                error: null,
                invitationPending: true,
                invitee: action.payload.invitee
            });
        case actions.INVITE_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                error: null
            });
        case actions.INVITE_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                error: action.error.message,
                invitationPending: false
            });
        case actions.INVITATION:
            return Object.assign({}, state, {
                invitedBy: action.payload.inviter
            });
        case actions.INVITATION_ACCEPTED:
            return Object.assign({}, state, {
                invitationPending: false,
                invitationAccepted: true
            });
        case actions.INVITATION_DENIED:
            return Object.assign({}, state, {
                invitationPending: false,
                invitationAccepted: false
            });
        default:
            return state;
    }
};

export default reducer;