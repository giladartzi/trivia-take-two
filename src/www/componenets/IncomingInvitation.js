import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import * as actions from '../actions/incomingInvitation';

let IncomingInvitation = (props) => {
    const actions = [
        <FlatButton
            label="Deny"
            secondary={true}
            onTouchTap={ () => props.incomingInvitationReject(props.inviter.id) }
        />,
        <FlatButton
            label="Accept"
            primary={true}
            onTouchTap={ () => props.incomingInvitationAccept(props.inviter.id) }
        />
    ];

    return (
        <Dialog title="Invitation received" modal={ false } open={ props.invitationPending } actions={ actions }>
            You have been invited by { props.inviter && props.inviter.username }
        </Dialog>
    );
};

let mapStateToProps = (state) => {
    return state.incomingInvitation;
};

let mapDispatchToProps = (dispatch) => {
    return {
        incomingInvitationAccept: (inviterId) => {
            dispatch(actions.incomingInvitationAccept({ inviterId }));
        },
        incomingInvitationReject: (inviterId) => {
            dispatch(actions.incomingInvitationReject({ inviterId }));
        }
    };
};

IncomingInvitation = connect(mapStateToProps, mapDispatchToProps)(IncomingInvitation);

export default IncomingInvitation;