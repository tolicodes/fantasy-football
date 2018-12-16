const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const users = require('./routes/users');
const players = require('./routes/players');

module.exports = {
    users: functions.https.onRequest(users),
    players: functions.https.onRequest(players)
};
