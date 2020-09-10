// const express = require('express');
// const Router = express.Router();
// const verifyJwt = require('../controllers/auth/jwt');

// const storiesController = require('../controllers/stories');
// Router.post('/poststory', verifyJwt.verifyToken, storiesController.postStory);

// module.exports = Router;

/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const storiesController = require('../controllers/stories');
const keyVerify = require('../controllers/auth/jwt');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.post('/poststory', keyVerify.verifyToken, storiesController.postStory);

  app.get(
    '/story/5f5a94fc1c2e7b3bcf2c84ed',
    keyVerify.verifyToken,
    storiesController.getStory
  );

  app.get('/story', storiesController.getAllStories);
};
