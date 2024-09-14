const mongoose = require('mongoose');

const publicRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    }
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PublicRoom = mongoose.model('PublicRoom', publicRoomSchema);
module.exports = PublicRoom;
