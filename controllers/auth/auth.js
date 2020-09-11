/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let secret = process.env.JWT_SECRET_KEY;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    } else {
      res.status(200).json({ message: 'User was registered successfully!' });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).json({ message: 'User Not found.' });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400,
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};
