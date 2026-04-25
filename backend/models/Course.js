const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true
    },

    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    credits: {
      type: Number,
      default: 3,
      min: [1, "Credits must be at least 1"],
      max: [10, "Credits cannot exceed 10"]
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher is required"]
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],

    maxStudents: {
      type: Number,
      default: 50
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


//  Prevent duplicate students in same course
courseSchema.path("students").validate(function (value) {
  return value.length === new Set(value.map(v => v.toString())).size;
}, "Duplicate students are not allowed");


//  Virtual field: number of enrolled students
courseSchema.virtual("enrolledCount").get(function () {
  return this.students.length;
});


//  Ensure virtuals are included in JSON response
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });


module.exports = mongoose.model("Course", courseSchema);