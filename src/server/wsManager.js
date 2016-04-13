var utils = require('./utils');
var values = require('lodash/values');
var flatten = require('lodash/flatten');
var without = require('lodash/without');

var userIdToWebSockets = {};
var wsIdToUserId = {};
var webSocketId = 0;

const SECRET = '4a3e853f-72ca-474f-b92a-5045e21794cb';

function handleIncomingConnection(data, ws) {
    var userId = data.id;
    if (!userIdToWebSockets[userId]) {
        userIdToWebSockets[userId] = [];
    }
    userIdToWebSockets[userId].push(ws);
    ws.webSocketId = webSocketId++;
    wsIdToUserId[ws.webSocketId] = userId;
    ws.send(JSON.stringify({ success: true }));
}

function removeWebSocket(ws) {
    var userId = wsIdToUserId[ws.webSocketId];
    userIdToWebSockets[userId] = without(userIdToWebSockets[userId], ws);
    delete wsIdToUserId[ws.webSocketId];
}

function sendMessage(ws, message) {
    if (typeof message !== 'string') {
        message = JSON.stringify(message);
    }

    try {
        ws.send(message);
    }
    catch (e) {
        console.error(e);
    }
}

function handleIncomingMessage(ws, message) {
    var json;

    try {
        json = JSON.parse(message);
    }
    catch (e) {
        console.error(e);
    }

    if (json && json.token) {
        utils.jwtVerify(json.token, SECRET)
            .then(decoded => handleIncomingConnection(decoded, ws))
            .catch(err => console.error(err));

    }
}

function initWebSocket(ws) {
    ws.on('message', message => handleIncomingMessage(ws, message));
    ws.on('close', () => removeWebSocket(ws));
    ws.on('error', () => removeWebSocket(ws));
}

function broadcast(message) {
    var flat = flatten(values(userIdToWebSockets));
    flat.forEach(ws => sendMessage(ws, message));
}

module.exports = {
    initWebSocket,
    broadcast
};