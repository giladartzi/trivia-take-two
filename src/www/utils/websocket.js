import { AUTHENTICATE_SUCCESS } from '../actions/user'

var store;
var reconnectTimeout;

function initWebSocket() {
    let ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => sendInitFrame(ws);
    ws.onclose = reconnect;
    ws.onerror = reconnect;
    ws.onmessage = handleIncomingMessage;
}

function sendInitFrame(ws) {
    ws.send(JSON.stringify({
        token: localStorage.getItem('token')
    }));
}

function reconnect() {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(initWebSocket, 1000);
}

function userIsAuthenticated(store) {
    var token = localStorage.getItem('token');

    if (token) {
        return Promise.resolve(token);
    }
    
    return new Promise((resolve, reject) => {
        let unsubscribe = store.subscribe(() => {
            let token = store.getState().user.token;
            if (token) {
                unsubscribe();
                resolve(token);
            }
        });
    });
}

function handleIncomingMessage(frame) {
    var json = JSON.parse(frame.data);
    
    if (json.actionType && json.payload) {
        store.dispatch({
            type: json.actionType,
            payload: json.payload
        });
    }
}

export function init(_store) {
    var token = localStorage.getItem('token');
    store = _store;
    
    userIsAuthenticated(store)
        .then(initWebSocket);
}