import React from 'react';
import { connect } from 'react-redux';
import * as availabilityActions from '../actions/availability';
import * as outgoingInvitationActions from '../actions/outgoingInvitation';
import * as gameActions from '../actions/game';
import ActionAnnouncement from 'material-ui/lib/svg-icons/action/announcement';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import IncomingInvitation from '../componenets/IncomingInvitation';
import OutgoingInvitation from '../componenets/OutgoingInvitation';
import Game from '../componenets/Game';

class Lounge extends React.Component {
    componentDidMount() {
        this.props.availability();
    }
    
    componentDidUpdate() {
        if (this.props.shouldDisplayGame) {
            this.props.displayGame();
        }
    }

    render() {
        let { onUserClick, availableUsers, displayGame } = this.props;

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
        availableUsers: state.availability.availableUsers,
        shouldDisplayGame: state.game.state === 'ACTIVE'
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        availability: () => {
            dispatch(availabilityActions.availability());
        },

        onUserClick: (id, username) => {
            dispatch(outgoingInvitationActions.outgoingInvitation({ invitee: { id, username } }));
        },

        displayGame: () => {
            dispatch(gameActions.displayGame());
        }
    };
};

Lounge = connect(mapStateToProps, mapDispatchToProps)(Lounge);

export default Lounge;