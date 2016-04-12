import React from 'react';
import { connect } from 'react-redux';

let TriviaApp = (props) => {
    return (<div>
        <h1>Trivia App</h1>
        
        {props.children}
        
        <div>{props.pending}</div>
        <div>{props.error}</div>
        <div>{props.username}</div>
        <div>{props.token}</div>
        <div>{props.r}</div>
    </div>);
};

let mapStateToProps = (state) => {
    return {
        pending: state.user.panding,
        error: state.user.error,
        username: state.user.username,
        token: state.user.token,
        r: state.routing.locationBeforeTransitions.pathname
    };
};

let mapDispatchToProps = null;

TriviaApp = connect(mapStateToProps, mapDispatchToProps)(TriviaApp);

export default TriviaApp;