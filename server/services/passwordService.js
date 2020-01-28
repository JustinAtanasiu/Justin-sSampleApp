const crypto = require('crypto');

var passwordService = {};
var characters = 'abcdefghijklmnopqrstuvwxyz';
var charactersLength = characters.length;

passwordService.generateRandomResetToken = function (user, done) {
  crypto.randomBytes(20, function (err, buffer) {
    done(err, user, buffer.toString('hex'));
  });
}

passwordService.generateRandomPassword = function () {
  var randomPassword = Math.random().toString(36).slice(-8);
  if (!/\d/.test(randomPassword)) {
    randomPassword += Math.floor(Math.random() * 10);
  } else if (!/[a-z]/.test(randomPassword)) {
    randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return randomPassword;
}

module.exports = passwordService;