const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  fathersName:{
    type : String
  },
  house: {
    type: String
  },
  year: {
    type: Number
  },
  contactNo: {
    type: Number,
    minlength: 10
  },
  address: {
    type: String
  }
},{ timestamps: true });

module.exports = mongoose.model('Student', studentSchema);