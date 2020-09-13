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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

  //POST /poststory
  app.post('/poststory', keyVerify.verifyToken, storiesController.postStory);
  //GET Particular Story
  app.get('/story/:id', keyVerify.verifyToken, storiesController.getStory);
  //Get all Story List
  app.get('/story', keyVerify.verifyToken, storiesController.getAllStories);
};
