/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const storiesController = require('../controllers/stories');
const keyVerify = require('../controllers/auth/jwt');
module.exports = function (app) {
  app.use(function (req, res, next) {
    //Setting Header for Response
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  //POST /poststory
  app.post('/poststory', keyVerify.verifyToken, storiesController.postStory);
  //GET Particular Story
  app.get('/story/:id', keyVerify.verifyToken, storiesController.getStory);
  //Get all Story List
  app.get('/story', keyVerify.verifyToken, storiesController.getAllStories);
};
