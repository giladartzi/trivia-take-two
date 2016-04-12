import React from 'react';
import NavLink from './NavLink';

export default class RegisterForm extends React.Component {
    constructor() {
        super();
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        
        this.props.onSubmit({
            username: this.refs.username.value,
            password: this.refs.password.value
        });
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" ref="username" placeholder="Username" />
                <br />
                <input type="password" ref="password" placeholder="Password" />
                <br />
                <button type="submit">{this.props.submit || 'Submit'}</button>
                <NavLink to={this.props.otherFormPath}>
                    {this.props.otherFormText}
                </NavLink>
            </form>
        );
    }
};

export default RegisterForm;