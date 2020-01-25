const hbs = require('nodemailer-express-handlebars'),
  config = require('../config.js'),
  nodemailer = require('nodemailer'),
  path = require('path');

var smtpTransport = nodemailer.createTransport({
  service: config.emailSettings.mailerServiceProvider,
  auth: {
    user: config.emailSettings.user,
    pass: config.emailSettings.password,
  }
});

const handlebarsOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./server/templates/'),
    layoutsDir: path.resolve('./server/templates/'),
    defaultLayout: null
  },
  viewPath: path.resolve('./server/templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

const sendMail = function (data, cb) {
  smtpTransport.sendMail(data, cb);
}

const getEmailData = function (to, template, subject, context) {
  return {
    to: to,
    from: config.emailSettings.user,
    template: template,
    subject: subject,
    context: context
  };
}

module.exports = {
  sendMail: sendMail,
  getEmailData: getEmailData
};