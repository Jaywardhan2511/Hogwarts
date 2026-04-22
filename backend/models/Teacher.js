const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  house: {
    type: String,
    enum: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]
  },
  house_head:{
    type: Boolean,
    default: false
  },
  experience: {
    type: Number  // in years
  },
  contactNo: {
    type: String,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);