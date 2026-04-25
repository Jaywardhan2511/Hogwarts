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
    type: String,
    minlength: 10,
    maxlength:10
  },
  address: {
    type: String
  }
},{ timestamps: true });

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);