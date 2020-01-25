var jwt = require('jsonwebtoken');
var config = require('../config.js');
var StatusCodes = require('../common/StatusCode')

var jwtService = {};

const verifyToken = function (token, cb) {
  if (token) {
    jwt.verify(token, config.mySecretKeyJWT, {}, function (err, decoded_token) {
      if (!err && decoded_token.email && new Date(decoded_token.exp * 1000) > new Date()) {
        cb(true)
      } else {
        cb(false)
      }
    })
  } else {
    cb(false)
  }
};

jwtService.checkUserAuthentication = function (req, res, next) {
  verifyToken(req.headers['x-auth'], function (isValid) {
    if (!isValid) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
    next();
  })
}

jwtService.generateToken = function (email) {
  const payload = {
    email: email,
    iat: Math.floor(Date.now() / 1000)
  }

  const signInOptions = {
    algorithm: config.mySecretAlgorithmJWT,
    expiresIn: config.jwtExpiration
  }
  return jwt.sign(payload, config.mySecretKeyJWT, signInOptions);
}

module.exports = jwtService;