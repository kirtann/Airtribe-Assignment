const express = require("express");
const {
  createComment,
  getAllComments,
} = require("../controllers/commentController");

const router = express.Router();

// Create comment API
router.route("/new/comment").post(createComment);

// Get all comments API
router.route("/comments").get(getAllComments);

module.exports = router;
