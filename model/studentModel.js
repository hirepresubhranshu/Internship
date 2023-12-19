const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
