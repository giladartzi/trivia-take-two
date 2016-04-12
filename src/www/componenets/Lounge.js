import React from 'react';
import { connect } from 'react-redux';

let Lounge = () => {
    return (
        <h1>Lounge</h1>
    );
};

let mapStateToProps = null;

let mapDispatchToProps = null;

Lounge = connect(mapStateToProps, mapDispatchToProps)(Lounge);

export default Lounge;