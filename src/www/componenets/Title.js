import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/user';

let Title = ({ logout }) => {
    const iconElementLeft = <IconButton><NavigationClose /></IconButton>;
    let iconElementRight = <FlatButton containerElement={<Link to="/register" />} label="Register"/>;
    let username = username || localStorage.getItem('username');

    if (username) {
        const icon = <IconButton><ActionAccountCircle /></IconButton>;
        const targetOrigin = {horizontal: 'right', vertical: 'top'};
        const anchorOrigin = {horizontal: 'right', vertical: 'top'};
        iconElementRight = (
            <IconMenu iconButtonElement={icon} targetOrigin={targetOrigin} anchorOrigin={anchorOrigin}>
                <MenuItem primaryText={username} />
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" onClick={logout} />
            </IconMenu>
        );
    }

    return (
        <AppBar title="ridd.li" iconElementLeft={iconElementLeft} iconElementRight={iconElementRight} />
    );
};

let mapStateToProps = (state) => {
    return {
        username: state.user.username
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

Title = connect(mapStateToProps, mapDispatchToProps)(Title);

export default Title;