import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';


let OutgoingInvitation = ({ invitee, invitationPending }) => {
    return (
        <Dialog title="Sending invitation" modal={ false } open={ invitationPending }>
            Inviting { invitee && invitee.username }...
        </Dialog>
    );
};

let mapStateToProps = (state) => {
    return {
        invitee: state.outgoingInvitation.invitee,
        invitationPending: state.outgoingInvitation.invitationPending
    };
};

let mapDispatchToProps = null;

OutgoingInvitation = connect(mapStateToProps, mapDispatchToProps)(OutgoingInvitation);

export default OutgoingInvitation;