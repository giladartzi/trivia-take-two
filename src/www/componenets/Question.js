import React from 'react';
import { connect } from 'react-redux';

let Question = () => {
    return (
        <h1>Question</h1>
    );
};

let mapStateToProps = null;

let mapDispatchToProps = null;

Question = connect(mapStateToProps, mapDispatchToProps)(Question);

export default Question;