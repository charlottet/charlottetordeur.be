'use strict';

var express = require('express');
var router = express.Router();
var mailgun = require('mailgun-js')({
  apiKey: process.env.CHA_MAILGUN_API_KEY,
  domain: process.env.CHA_MAILGUN_DOMAIN
});

//
// Root Route
//

// GET home page
router.get('/', function (req, res) {
  res.redirect('/en');
});

// GET English home page
router.get('/en', function (req, res) {
  res.render('index-en');
});

// GET French home page
router.get('/fr', function (req, res) {
  res.render('index-fr');
});

// GET French home page
router.get('/*', function (req, res) {
  res.redirect('/en');
});

// POST Contact form
router.post('/contact', function (req, res) {
  // Sending Contact Email
  var data = {
    from: 'Charlotte Site internet <info@charlottetordeur.com>',
    to: 'charlottetordeur@gmail.com',
    subject: 'Formulaire de contact',
    text: 'message:\n\n' + req.body.inputMessage + '\n\n email: ' + req.body.inputEmail + '\n\n name:' + req.body.inputName
  };

  mailgun.messages().send(data, function (error) {
    if (error === undefined) {
      console.log('Mesage from: ' + data.from + ' has been sent');
      res.json({
        status: 'OK',
        html: 'Message bien envoyé'
      });
    } else {
      console.log('Mesage from: ' + data.from + ' failed to be sent');
      res.json({
        status: 'NOK',
        html: 'Il y a eu un problème'
      });
    }
  });
});

module.exports = router;
