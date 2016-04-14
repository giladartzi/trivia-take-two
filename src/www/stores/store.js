import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import user from '../reducers/user';
import availability from '../reducers/availability';
import invite from '../reducers/invite';

const loggerMiddleware = createLogger();
const routerMw = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
    return createStore(
        combineReducers({ user, availability, invite, routing: routerReducer }),
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            routerMw
        )
    )
}