import React from 'react';
import { connect } from 'react-redux';
import * as availabilityActions from '../actions/availability';
import * as inviteActions from '../actions/invite';

let Lounge = ({ onEnterClick, onUserClick, pending, availableUsers }) => {
    let lis = availableUsers.map(user => {
        return (
            <li key={user.id}
                onClick={ () => onUserClick(user.id, user.username) }>
                {user.username}
            </li>
        );
    });

    return (
        <div>
            <h1>Lounge</h1>
            <button onClick={onEnterClick} disabled={pending}>Enter</button>
            <ul>
                { lis }
            </ul>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        pending: state.availability.pending,
        state: state.availability.state,
        availableUsers: state.availability.availableUsers
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onEnterClick: (event) => {
            event.preventDefault();
            availabilityActions.availability(dispatch);
        },

        onUserClick: (id, username) => {
            inviteActions.invite(dispatch, { invitee: { id, username } });
        }
    };
};

Lounge = connect(mapStateToProps, mapDispatchToProps)(Lounge);

export default Lounge;