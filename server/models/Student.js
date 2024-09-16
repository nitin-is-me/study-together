const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
