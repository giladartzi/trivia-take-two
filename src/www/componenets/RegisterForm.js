import React from 'react';
import { connect } from 'react-redux';

import UserPasswordForm from './UserPasswordForm';
import * as actions from '../actions/user';

let RegisterForm = ({ onRegisterFormSubmit }) => {
    return <UserPasswordForm
        onSubmit={onRegisterFormSubmit}
        otherFormPath="/authenticate"
        otherFormText="Authenticate"
    />;
};

let mapStateToProps = null;

let mapDispatchToProps = (dispatch) => {
    return {
        onRegisterFormSubmit: (payload) => {
            actions.register(dispatch, payload);
        }
    }
};

RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default RegisterForm;