const crypto = require('crypto');

var passwordService = {};

passwordService.generateRandomResetToken = function (user, done) {
  crypto.randomBytes(20, function (err, buffer) {
    done(err, user, buffer.toString('hex'));
  });
}

passwordService.generateRandomPassword = function () {
  return Math.random().toString(36).slice(-8);
}

module.exports = passwordService;