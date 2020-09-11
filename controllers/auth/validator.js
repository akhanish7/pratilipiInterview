/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const User = require('../../models/users');

checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(400).json({ message: 'Failed! Email is already in use!' });
      return;
    }

    next();
  });
};
const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
