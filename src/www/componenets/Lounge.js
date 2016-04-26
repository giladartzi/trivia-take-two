import React from 'react';
import { connect } from 'react-redux';
import * as availabilityActions from '../actions/availability';
import * as outgoingInvitationActions from '../actions/outgoingInvitation';
import ActionAnnouncement from 'material-ui/lib/svg-icons/action/announcement';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import IncomingInvitation from '../componenets/IncomingInvitation';
import OutgoingInvitation from '../componenets/OutgoingInvitation';

class Lounge extends React.Component {
    componentDidMount() {
        this.props.availability();
    }

    render() {
        let { onUserClick, availableUsers } = this.props;

        let lis = availableUsers.map(user => {
            return (
                <ListItem key={user.id} primaryText={user.username} rightIcon={<ActionInfo />}
                    onClick={ () => onUserClick(user.id, user.username) } />
            );
        });

        let hasOtherPlayers = lis.length > 0;

        return (
            <div>
                { hasOtherPlayers ? <List>{ lis }</List> : null }
                { hasOtherPlayers ? null : <ActionAnnouncement /> }
                <IncomingInvitation />
                <OutgoingInvitation />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        pending: state.availability.pending,
        state: state.availability.state,
        availableUsers: state.availability.availableUsers
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        availability: () => {
            dispatch(availabilityActions.availability());
        },

        onUserClick: (id, username) => {
            dispatch(outgoingInvitationActions.outgoingInvitation({ invitee: { id, username } }));
        }
    };
};

Lounge = connect(mapStateToProps, mapDispatchToProps)(Lounge);

export default Lounge;