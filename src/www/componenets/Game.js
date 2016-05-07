import React from 'react';
import { connect } from 'react-redux';

import Question from './Question';
import * as gameActions from '../actions/game'

class Game extends React.Component{
    componentDidMount() {
        this.props.getQuestion();
    }

    render() {
        return (
            <div>
                <h1>Game</h1>
                <Question text={1} answers={[1]} />
            </div>
        );
    }
}

let mapStateToProps = null;

let mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: () => {
            dispatch(gameActions.getQuestion());
        }
    };
};

Game = connect(mapStateToProps, mapDispatchToProps)(Game);

export default Game;