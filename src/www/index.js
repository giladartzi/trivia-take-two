import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import TriviaApp from './componenets/TriviaApp';
import Lounge from './componenets/Lounge';
import RegisterForm from './componenets/RegisterForm';
import AuthenticateForm from './componenets/AuthenticateForm';
import configureStore from './stores/store';
import * as websocket from './utils/websocket';

let store = configureStore();
let history = syncHistoryWithStore(browserHistory, store);
websocket.init(store);

let validateAuthentication = (nextState, replace) => {
    var token = localStorage.getItem('token');

    if (!token) {
        replace('/authenticate');
    }
};

let validateNonAuthentication = (nextState, replace) => {
    var token = localStorage.getItem('token');

    if (token) {
        replace('/');
    }
};

const root = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={TriviaApp}>
                <IndexRoute component={Lounge} onEnter={validateAuthentication} />
                <Route path="register" component={RegisterForm} onEnter={validateNonAuthentication} />
                <Route path="authenticate" component={AuthenticateForm} onEnter={validateNonAuthentication} />
            </Route>
        </Router>
    </Provider>
);

const element = document.getElementById('triviaApp');

ReactDOM.render(root, element);