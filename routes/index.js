var express       = require('express');
var router        = express.Router();
var mailgun       = require('mailgun-js')({apiKey: process.env.CHA_MAILGUN_API_KEY, domain: process.env.CHA_MAILGUN_DOMAIN});


//  
// Root Route
//

// GET home page
router.get('/', function(req, res) {
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

// //  
// // Pages Routes
// //

// // GET profile page
// router.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile', {message: req.flash('profileMessage'), user: req.user});
// });

// // GET games page
// router.get('/games', isLoggedIn, function(req, res) {
//   res.render('games');
// });

// // GET nights page
// router.get('/nights', isLoggedIn, function(req, res) {
//   res.render('nights');
// });


// //
// // API
// //

// // GET Games JSON
// router.get('/api/games', function(req, res, next) {
//   Game.find(function(err, games){
//     if(err){ return next(err); }

//     res.json(games);
//   });
// });

// // Query Game by ID
// router.param('game', function(req, res, next, id) {
//   var query = Game.findById(id);

//   query.exec(function (err, game){
//     if (err) { return next(err); }
//     if (!game) { return next(new Error("can't find post")); }

//     req.game = game;
//     return next();
//   });
// });

// // GET Game by ID JSON
// router.get('/api/games/:game', function(req, res) {
//   //req.post.populate('comments', function(err, post) {
//     res.json(req.game);
//   //});
// });


// //
// // Authentication Routes
// //

// // GET login page
// router.get('/login', function(req, res) {
//   // render the page and pass in any flash data if it exists
//   res.render('login.ejs', { message: req.flash('loginMessage') }); 
// });

// // POST login form
// router.post('/login', passport.authenticate('local-login', {
//     successRedirect : '/',
//     failureRedirect : '/#/login',
//     failureFlash : true
// }));

// // GET Signup page
// router.get('/signup', function(req, res) {
//     // render the page and pass in any flash data if it exists
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
// });

// // POST Signup form
// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/',
//     failureRedirect : '/#/signup',
//     failureFlash : true
// }));

// // GET Logout
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

// // GET Forgot page
// router.get('/forgot', function(req, res) {
//   res.render('forgot', {
//     user: req.user,
//     message: req.flash('forgotMessage')
//   });
// });

// // POST Forgot form
// router.post('/forgot', function(req, res){
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({ 'local.email': req.body.email }, function(err, user) {
//         if (!user) {
//           req.flash('forgotMessage', 'No account with that email address exists.');
//           return res.redirect('/#/forgot');
//         }

//         user.local.resetPasswordToken = token;
//         user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//       // Sending Welcome Email
//       var data = {
//         from: 'Don\'t get board <no-reply@mg.dontgetboard.net>',
//         to: user.local.email,
//         subject: 'Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };

//       mailgun.messages().send(data, function (error, body) {
//         console.log(body);
//         console.log(error);
//         req.flash('forgotMessage', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.')
//         res.redirect('/#/forgot');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/#/forgot');
//   });
// });

// // GET Reset Page with token
// router.get('/reset/:token', function(req, res) {
//   User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
//     if (!user) {
//       req.flash('forgotMessage', 'Password reset token is invalid or has expired.');
//       res.render('forgot', {
//         message: req.flash('forgotMessage')
//       });
//     }else{
//       res.render('reset', {
//         message: req.flash('resetMessage'),
//         token: req.params.token
//       });
//     }
//   });
// });

// // POST Reset Form with token
// router.post('/reset/:token', function(req, res) {
//   async.waterfall([
//     function(done) {
//       User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//           req.flash('forgotMessage', 'Password reset token is invalid or has expired.');
//           return res.redirect('/#/forgot');
//         }

//         if (req.body.password != req.body.confirm) {
//           req.flash('resetMessage', 'Password confirmation doesn\'t match.');
//           return res.redirect('/#/reset/'+req.params.token);
//         }

//         if (req.body.password == '') {
//           req.flash('resetMessage', 'Password can\'t be empty!');
//           return res.redirect('/#/reset/'+req.params.token);
//         }

//         user.local.password = user.generateHash(req.body.password);
//         user.local.resetPasswordToken = undefined;
//         user.local.resetPasswordExpires = undefined;

//         user.save(function(err) {
//           req.logIn(user, function(err) {
//             done(err, user);
//           });
//         });
//       });
//     },
//     function(user, done) {

//       // Sending Welcome Email
//       var data = {
//         from: 'Don\'t get board <no-reply@mg.dontgetboard.net>',
//         to: user.local.email,
//         subject: 'Password Reseted',
//         text: 'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
//       };

//       mailgun.messages().send(data, function (error, body) {
//         console.log(body);
//         console.log(error);
//         req.flash('loginMessage', 'Password has been changed!')
//         res.redirect('/');
//       });
//     }
//   ], function(err) {
//     res.redirect('/');
//   });
// });


// // Function to check if a user is loggedIn
// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, continue to next script 
//   if (req.isAuthenticated())
//       return next();

//   // if he's not, redirect him to the home page
//   res.render('login', { message: "Please login to access this area!" });

// }

module.exports = router;
