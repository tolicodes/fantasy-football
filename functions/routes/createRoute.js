const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    return app;
}