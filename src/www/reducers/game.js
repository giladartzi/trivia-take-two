import * as incomingInvitationActions from '../actions/incomingInvitation';
import * as outgoingInvitationActions from '../actions/outgoingInvitation';
import * as gameActions from '../actions/game';

let reducer = (state = { id: null, state: 'INACTIVE' }, action) => {
    switch (action.type) {
        case incomingInvitationActions.INCOMING_INVITATION_ACCEPT_SUCCESS:
        case outgoingInvitationActions.OUTGOING_INVITATION_ACCEPTED:
            return Object.assign({}, state, {
                id: action.payload.gameId,
                state: action.payload.gameState
            });
        default:
            return state;
    }
};

export default reducer;