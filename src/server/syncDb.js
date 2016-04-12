var dataLayer = require('./dataLayer');
var values = require('lodash/values');

var syncs = values(dataLayer)
    .map(model => model.sync({force: true}));

console.log(syncs);

Promise.all(syncs)
    .then(() => {
        console.log('Done');
        process.exit();
    });