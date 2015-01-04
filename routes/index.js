var express       = require('express');
var router        = express.Router();
var mailgun       = require('mailgun-js')({apiKey: process.env.CHA_MAILGUN_API_KEY, domain: process.env.CHA_MAILGUN_DOMAIN});




//  
// Root Route
//

// GET home page
router.get('/', redirectHttps, function(req, res) {
  res.render('index');   
});

// POST Contact form
router.post('/contact', function(req, res){
  
  //Sending Contact Email
  var data = {
    from: req.body.inputName +' <'+ req.body.inputEmail +'>',
    to: 'charlottetordeur@gmail.com',
    subject: 'Formulaire de contact',
    text: req.body.inputMessage + '\n\n'
  };

  mailgun.messages().send(data, function (error, body) {
    if (error == undefined){
      console.log("ok");
      res.json({status:"OK",html:"Message bien envoyé"}); 
    }else{
      console.log("nok");
      res.json({status:"NOK",html:"Il y a eu un problème"});;
    }
  });

});

function redirectHttps(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http') { 
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
}

module.exports = router;
