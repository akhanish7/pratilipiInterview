/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */
const io = require('../socket');
const Stories = require('../models/stories');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
var count = 0;
var $ipsConnected = [];

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
  let token = req.header('x-access-key');
  let currentUserId = jwt.decode(token, process.env.JWT_SECRET_KEY).id;

  //Database Function to send Desired Response
  Stories.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { readUser: currentUserId } },
    { new: true },
    (err, story) => {
      if (err) {
        res.status(404).send({ message: 'title not found' });
      } else {
        let readCount = story.readUser.length;
        /* Connect socket */
        io.getIO().on('connection', function (socket) {
          var $ipAddress = socket.handshake.address;

          if (!$ipsConnected.hasOwnProperty($ipAddress)) {
            $ipsConnected[$ipAddress] = 1;

            count++;

            socket.emit('counter', { count: count });
          }

          /* Disconnect socket */

          socket.on('disconnect', function () {
            if ($ipsConnected.hasOwnProperty($ipAddress)) {
              delete $ipsConnected[$ipAddress];

              count--;

              socket.emit('counter', { count: count });
            }
          });
        });

        //Sending Response
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
