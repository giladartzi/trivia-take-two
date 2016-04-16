import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

const paperStyle = {
    margin: '20px auto',
    textAlign: 'center',
    display: 'inline-block',
    padding: '20px 40px'
};


export default class RegisterForm extends React.Component {
    constructor() {
        super();
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        
        this.props.onSubmit({
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        });
    }
    
    render() {
        return (
            <Paper style={paperStyle} zDepth={2}>
                <form onSubmit={this.onSubmit}>
                    <TextField hintText="" floatingLabelText="Username" ref="username" />
                    <br />
                    <TextField hintText="Use a strong one!" floatingLabelText="Password" type="password" ref="password" />
                    <br />
                    <br />
                    <RaisedButton label={this.props.submit || 'Submit'} primary={true} type="submit" />
                </form>
            </Paper>
        );
    }
};

export default RegisterForm;