/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/users');
//To Verify JWT TOKEN

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-key'];
  let secret = process.env.JWT_SECRET_KEY;
  //Token Not Received
  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    //Wrong Token Received
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;
    next();
  });
};
