import React from 'react';
import { connect } from 'react-redux';

import UserPasswordForm from './UserPasswordForm';
import * as actions from '../actions/user';

let AuthenticateForm = ({ onAuthenticateFormSubmit }) => {
    return <UserPasswordForm
        onSubmit={onAuthenticateFormSubmit}
        submit="Authenticate"
        otherFormPath="/register"
        otherFormText="Register"
    />;
};

let mapStateToProps = null;

let mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticateFormSubmit: (payload) => {
            actions.authenticate(dispatch, payload);
        }
    }
};

AuthenticateForm = connect(mapStateToProps, mapDispatchToProps)(AuthenticateForm);

export default AuthenticateForm;