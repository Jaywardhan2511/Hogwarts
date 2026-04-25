import Course from "../models/course.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";


//  Create Course
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  Get All Courses (with populate )
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher")
      .populate("students");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Get Single Course
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher")
      .populate("students");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Update Course
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  Delete Course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Enroll Student
export const enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.students.some(id => id.toString() === studentId)) {
      return res.status(400).json({ message: "Student already enrolled" });
    }

    if (course.students.length >= course.maxStudents) {
      return res.status(400).json({ message: "Course is full" });
    }

    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: "Student enrolled", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Remove Student
export const removeStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.students.pull(studentId);
    await course.save();

    res.status(200).json({ message: "Student removed", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Assign / Change Teacher
export const assignTeacher = async (req, res) => {
  try {
    const { courseId, teacherId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const course = await Course.findByIdAndUpdate(
      courseId,
      { teacher: teacherId },
      { new: true }
    );

    res.status(200).json({ message: "Teacher assigned", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};