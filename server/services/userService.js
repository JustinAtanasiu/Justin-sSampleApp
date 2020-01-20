const bcrypt = require('bcrypt');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/;
const jwtService = require('./jwtService.js');
const User = require('../schemas/UserSchema');
const StatusCode = require('../common/StatusCode');

var userService = {};

userService.login = function (body, cb) {
    const email = body.email && body.email.toLowerCase();
    const password = body.password

    if (email && isValidEmail(email) && password && isValidPassword(password)) {
        findUser(email, password, function (statusCode, user, token) {
            cb(statusCode, user, token);
        });
    } else {
        cb(StatusCode.BAD_REQUEST, { errorCode: 'LOGIN_2' })
    }
}

var findUser = function (email, password, cb) {
    User.findOne({ email: email }).exec(function (err, user) {
        if (err || !user) {
            cb(401, { errorCode: 'LOGIN_1' });
        } else {
            //Since password is encrypted in DB, we need to use bcrypt.compare to test if the input password is correct for user.
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    const { email, username } = user;
                    cb(StatusCode.OK, { email, username }, jwtService.generateToken(user.email));
                } else {
                    cb(StatusCode.UNAUTHORIZED, { errorCode: 'LOGIN_1' });
                }
            })
        }
    });
}

userService.register = function (body, cb) {
    const email = body.email && body.email.toLowerCase();
    const password = body.password;
    const username = body.username;

    if (email && isValidEmail(email) && password && isValidPassword(password) && username && isValidUsername(username)) {
        var userData = {
            email: email,
            username: username,
            password: password
        };

        User.create(userData, function (err, user) {
            if (err) {
                cb(StatusCode.CONFLICT, { errorCode: 'REGISTER_1' });
            } else {
                const { email, username } = user;
                cb(StatusCode.OK, { email, username }, jwtService.generateToken(user.email));
            }
        });
    } else {
        cb(StatusCode.BAD_REQUEST, { errorCode: 'REGISTER_2' });
    }
}

userService.resetPassword = function (body, cb) {
    const email = body.email && body.email.toLowerCase();
    if (email && isValidEmail(email)) {
        User.findOne({ email: email }).exec(function (err, user) {
            if (err || !user) {
                cb(200, { messageCode: 'RESET_PASSWORD_1' });
            } else {
                //send email are you sure, make new db confirm reset, send 200
                cb(200, { messageCode: 'RESET_PASSWORD_1' });
            }
        });
    } else {
        cb(200, { messageCode: 'RESET_PASSWORD_2' });
    }
}

var isValidEmail = function (email) {
    return emailRegexp.test(email);
}

var isValidUsername = function (username) {
    return username.length >= 6 || username.length < 20;
}

var isValidPassword = function (password) {
    return passwordRegexp.test(password);
}

module.exports = userService;