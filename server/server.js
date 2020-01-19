var config = require('./config.js');
var userService = require('./services/userService.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoSanitize = require('express-mongo-sanitize');
var xss = require('xss-clean');
var app = express();
var StatusCodes = require('./common/StatusCode');

var port = config.port;

mongoose.connect('mongodb://' + config.mongoDbUser + ':' + config.mongoDbPassword + config.mongoDbUrl + config.mongoDbName);

//Needed due to cors issues
app.use(function (req, res, next) {
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Data Sanitization against XSS
app.use(xss());

// Data Sanitization for NoSQL Injections
app.use(mongoSanitize());

// Use body parser to get the information on body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user/login', function (req, res) {
    userService.login(req.body, function (statusCode, response, token) {
        if (token) {
            res.header({ 'x-auth': token });
        }
        res.status(statusCode).send(response);
    })
});

app.post('/user/register', function (req, res) {
    userService.register(req.body, function (statusCode, response, token) {
        if (token) {
            res.header({ 'x-auth': token });
        }
        res.status(statusCode).send(response);
    })
});

app.get('/user/logout', function (req, res) {
    res.status(StatusCodes.UNAUTHORIZED).send({});
});

app.listen(port, () => console.log(`Connected on ${port}!`));