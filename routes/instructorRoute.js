const express = require("express");

const {
  getAllInstructors,
  createInstructor,
} = require("../controllers/instructorsController");

const router = express.Router();

// Get all instructors API
router.route("/instructors").get(getAllInstructors);

// Create instructor API
router.route("/new/instructor").post(createInstructor);

module.exports = router;
