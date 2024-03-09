const express = require("express");

const db = require("../config/database");
const {
  getAllCourses,
  createCourse,
} = require("../controllers/coursesController");

const router = express.Router();

// Get all courses API
router.route("/courses").get(getAllCourses);

// Create course API
router.route("/new/course").post(createCourse);

module.exports = router;
