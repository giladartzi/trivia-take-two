import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import user from '../reducers/user';
import availability from '../reducers/availability';
import incomingInvitation from '../reducers/incomingInvitation';
import outgoingInvitation from '../reducers/outgoingInvitation';
import game from '../reducers/game';

const loggerMiddleware = createLogger();
const routerMw = routerMiddleware(browserHistory);
const reducers = combineReducers({
    user,
    availability,
    incomingInvitation,
    outgoingInvitation,
    game,
    routing: routerReducer
});

export default function configureStore(initialState) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            routerMw
        )
    )
}