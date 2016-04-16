import React from 'react';
import { connect } from 'react-redux';
import Title from './Title';

let TriviaApp = (props) => {
    return (<div>
        <Title />
        {props.children}
    </div>);
};

let mapStateToProps = null;

let mapDispatchToProps = null;

TriviaApp = connect(mapStateToProps, mapDispatchToProps)(TriviaApp);

export default TriviaApp;