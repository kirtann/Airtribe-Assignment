const express = require("express");

const db = require("../config/database");
const {
  getAllCourses,
  createCourse,
  singleCourseDetails,
  updateCourseDetails,
  deleteCourse,
} = require("../controllers/coursesController");

const router = express.Router();

// Get all courses API
router.route("/courses").get(getAllCourses);

// Create course API
router.route("/new/course").post(createCourse);

// Get single course details API
router.route("/course/:id").get(singleCourseDetails);

// Update course details API
router.route("/course/:id").put(updateCourseDetails);

// Delete course API
router.route("/course/:id").delete(deleteCourse);

module.exports = router;
