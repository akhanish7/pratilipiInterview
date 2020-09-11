/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */
const io = require('../socket');
const Stories = require('../models/stories');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
let activeUsers = 0;

//Get all stories title and _id
exports.getAllStories = (req, res, next) => {
  Stories.find({})
    .select({ title: 1, _id: 1 })
    .then((stories) => {
      res.status(200).send(stories);
    });
};

//POST story with title,content
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

//GET story based on _id
exports.getStory = (req, res, next) => {
  console.log(req.params.id);
  let token = req.header('x-access-token');
  let currentUserId = jwt.decode(token, process.env.JWT_SECRET_KEY).id;

  Stories.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { readUser: currentUserId } },
    { new: true },
    (err, story) => {
      if (err) {
        res.status(404).send({ message: 'title not found' });
      } else {
        let readCount = story.readUser.length;
        io.getIO().sockets.on('connection', function (socket) {
          activeUsers++;
          io.getIO().emit('activeUsers', {
            activeUsers: activeUsers,
          });
        });
        io.getIO().sockets.on('disconnect', function () {
          activeUsers--;
          io.getIO().emit('activeUsers', {
            activeUsers: activeUsers,
          });
        });
        res.status(200).json({
          _id: story._id,
          title: story.title,
          content: story.content,
          readCount: readCount,
        });
      }
    }
  );
};
