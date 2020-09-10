/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const verifySignUp = require('../controllers/auth/validator');
const controller = require('../controllers/auth/auth');
const keyVerify = require('../controllers/auth/jwt');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/signup',
    verifySignUp.checkDuplicateUsername,

    controller.signup
  );

  app.post('/signin', controller.signin);
};
