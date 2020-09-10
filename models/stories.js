/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoriesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    primaryKey: true,
    allowNull: false,
    auto: true,
  },
  title: {
    type: String,
    allowNull: false,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    allowNull: false,
    required: true,
  },
  readCount: {
    type: Number,
    allowNull: true,
    default: 0,
  },
});

module.exports = mongoose.model('Stories', StoriesSchema);
