'use strict';

var express = require('express');
var router  = express.Router();
var mailgun = require('mailgun-js')({
  apiKey : process.env.CHA_MAILGUN_API_KEY,
  domain : process.env.CHA_MAILGUN_DOMAIN
});

//
// HTTPS Redirect
//

function redirectHttps (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
}

//
// Root Route
//

// GET home page
router.get('/', redirectHttps, function (req, res) {
  res.redirect('/en');
});

// GET English home page
router.get('/en', redirectHttps, function (req, res) {
  res.render('index-en');
});

// GET French home page
router.get('/fr', redirectHttps, function (req, res) {
  res.render('index-fr');
});

// POST Contact form
router.post('/contact', function (req, res) {

  //Sending Contact Email
  var data = {
    from: req.body.inputName + ' <' + req.body.inputEmail + '>',
    to: 'charlottetordeur@gmail.com',
    subject: 'Formulaire de contact',
    text: req.body.inputMessage + '\n\n'
  };

  mailgun.messages().send(data, function (error) {
    if (error === undefined) {
      console.log('Mesage from: ' + data.from + ' has been sent');
      res.json({
        status: 'OK',
        html: 'Message bien envoyé'
      });
    } else {
      console.log('Mesage from: ' + data.from + ' failde to be sent');
      res.json({
        status: 'NOK',
        html: 'Il y a eu un problème'
      });
    }
  });

});

module.exports = router;
