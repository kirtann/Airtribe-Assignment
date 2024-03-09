const express = require("express");

const {
  registerCourse,
  updateLead,
  searchLeads,
  getAllLeads,
} = require("../controllers/leadsControllers");

const router = express.Router();

// Course registration API
router.route("/new/lead").post(registerCourse);

// Lead update API
router.route("/lead/:id").put(updateLead);

// Lead search API
router.route("/search/lead").get(searchLeads);

// Get all leads API
router.route("/leads").get(getAllLeads);

module.exports = router;
