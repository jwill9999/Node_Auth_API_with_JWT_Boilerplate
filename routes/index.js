const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport_jwt');
const passportLocalService = require('../services/passport_local');

//middleware to use jwt strategy and set session to false as using jwt token
const AuthGuard = passport.authenticate('jwt', { session: false });
const local_Login = passport.authenticate('local', { session: false });

/* GET '/'  */
router.get('/', AuthGuard, function (req, res, next) {
  res.send({message: 'Protected AuthGuard route'});
});

/* POST signup. */
router.post('/signup', Authentication.signup);

/* POST signin. */
router.post('/signin', local_Login, Authentication.signin);

module.exports = router;
