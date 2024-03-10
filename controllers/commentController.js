const db = require("../config/database");

// Create a new comment
exports.createComment = (req, res) => {
  const { content, lead_id, instructor_id } = req.body;
  const query =
    "INSERT INTO comments (content, lead_id, instructor_id) VALUES (?, ?, ?)";
  db.query(query, [content, lead_id, instructor_id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send({
      status: "success",
      message: "Comment created successfully",
      result,
    });
  });
};

// Get all comments
exports.getAllComments = (req, res) => {
  const query = "SELECT * FROM comments";
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send({
      status: "success",
      message: "Comments retrieved successfully",
      result,
    });
  });
};
