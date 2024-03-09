const express = require("express");

const {
  getAllInstructors,
  createInstructor,
  singleInstructorDetails,
  updateInstructorDetails,
  getCoursesByInstructor,
} = require("../controllers/instructorsController");

const router = express.Router();

// Get all instructors API
router.route("/instructors").get(getAllInstructors);

// Create instructor API
router.route("/new/instructor").post(createInstructor);

// Get single instructor details API
router.route("/instructor/:id").get(singleInstructorDetails);

// Update instructor details API
router.route("/instructor/:id").put(updateInstructorDetails);

// Get all courses by an instructor
router.route("/instructor/:id/courses").get(getCoursesByInstructor);

module.exports = router;
