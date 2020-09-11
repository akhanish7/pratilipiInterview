const Stories = require('../models/stories');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
exports.getAllStories = (req, res, next) => {
  Stories.find({})
    .select({ title: 1, _id: 1 })
    .then((stories) => {
      // stories.map((story) => {
      //   console.log(story.content);
      // });
      console.log(stories);
    });
};

exports.postStory = (req, res, next) => {
  const story = new Stories({
    title: req.body.title,
    content: req.body.content,
  });

  story.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: 'Story was successfully Posted!' });
    }
  });
};

exports.getStory = (req, res, next) => {
  let id = '5f5a94fc1c2e7b3bcf2c84ed';
  let token = req.header('x-access-token');
  let currentUserId = jwt.decode(token, process.env.JWT_SECRET_KEY).id;
  Stories.findOneAndUpdate(
    { _id: id },
    { $addToSet: { readUser: currentUserId } },
    { new: true },
    (err, story) => {
      if (err) {
        res.status(404).send({ message: 'title not found' });
      }
      let readCount = story.readUser.length;
      res.status(200).json({
        _id: story._id,
        title: story.title,
        content: story.content,
        readCount: readCount,
      });
    }
  );
};
