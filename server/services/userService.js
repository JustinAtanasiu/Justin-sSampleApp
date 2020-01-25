const bcrypt = require('bcrypt');
const async = require('async');

const jwtService = require('./jwtService.js');
const passwordService = require('./passwordService');
const emailService = require('./emailService');

const User = require('../schemas/UserSchema');
const StatusCode = require('../common/StatusCode');
const config = require('../config.js');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/;

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
    async.waterfall([
      function (done) {
        User.findOne({ email: email }).exec(function (err, user) {
          if (err || !user) {
            return cb(200, { messageCode: 'RESET_PASSWORD_1' });
          } else {
            done(err, user);
          }
        })
      },
      passwordService.generateRandomResetToken,
      function (user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + config.passwordSettings.resetPasswordExpires }, { upsert: true, new: true }).exec(function (err, new_user) {
          done(err, token, new_user);
        });
      },
      function (token, user, done) {
        emailService.sendMail(emailService.getEmailData(user.email, 'resetPasswordTemplate', 'Password Reset Request!', {
          url: config.serverSettings.url + ':' + config.serverSettings.port + '/user/confirmResetPassword?token=' + token,
          name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
          email: user.email
        }), function (err) {
          if (!err) {
            return cb(200, { messageCode: 'RESET_PASSWORD_1' });
          } else {
            done(err);
          }
        });
      }
    ], function (err) {
      return cb(200, { messageCode: 'RESET_PASSWORD_3' });
    });
  } else {
    cb(200, { messageCode: 'RESET_PASSWORD_2' });
  }
}

userService.confirmResetPassword = function (queryParams, cb) {
  const errorMsg = 'We are sorry, an unexpected error happened. Please try again';
  const successMsg = 'Password successfully reset. Please verify your email.';

  User.findOne({
    reset_password_token: queryParams.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function (err, user) {
    if (!err && user) {
      const newPassword = passwordService.generateRandomPassword();
      user.password = newPassword; //password is hashed pre save
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      user.last_password_change = new Date();
      user.save(function (err) {
        if (err) {
          return done(err);
        } else {
          emailService.sendMail(emailService.getEmailData(user.email, 'confirmResetPasswordTemplate', 'Password Reset Confirmation!', {
            name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
            password: newPassword
          }), function (err) {
            if (!err) {
              return cb(200, successMsg)
            } else {
              done(err);
            }
          });
        }
      });
    } else {
      return cb(400, errorMsg);
    }
  });
}

const isValidEmail = function (email) {
  return emailRegexp.test(email);
}

const isValidUsername = function (username) {
  return username.length >= 6 || username.length < 20;
}

const isValidPassword = function (password) {
  return passwordRegexp.test(password);
}

module.exports = userService;