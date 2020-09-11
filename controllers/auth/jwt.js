/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/users');

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let secret = process.env.JWT_SECRET_KEY;
  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};
