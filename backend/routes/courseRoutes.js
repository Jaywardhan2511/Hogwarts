const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollStudent,
  removeStudent,
  assignTeacher
} = require("../controllers/courseController");

const router = express.Router();

// CRUD
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Custom routes
router.post("/enroll", enrollStudent);
router.post("/remove", removeStudent);
router.post("/assign-teacher", assignTeacher);

module.exports = router;