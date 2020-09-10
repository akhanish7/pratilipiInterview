/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    primaryKey: true,
    allowNull: false,
    auto: true,
  },
  username: {
    type: String,
    allowNull: false,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    allowNull: false,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
