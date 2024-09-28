const mongoose = require('mongoose');

const privateRoomSchema = mongoose.Schema({
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
  code: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PrivateRoom = mongoose.model('PrivateRoom', privateRoomSchema);
module.exports = PrivateRoom;
