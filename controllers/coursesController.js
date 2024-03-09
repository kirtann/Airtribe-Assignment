const db = require("../config/database");

// Get all courses
exports.getAllCourses = (req, res) => {
  // Query to get all courses
  const query = `SELECT * FROM airtribe.courses`;

  // Execute query
  db.query(query, (err, results) => {
    if (err) {
      res.send({
        status: "error",
        err,
      });
    }

    // Check if course exists
    if (results.length === 0) {
      res
        .status(404)
        .json({ error: "No Courses found. Please Create New Course" });
      return;
    }

    // Return courses
    res.json({
      status: "success",
      message: "Courses fetched successfully",
      results,
    });
  });
};

// Create a new course
exports.createCourse = (req, res) => {
  const { name, max_seats, start_date, instructor_id } = req.body;
  const query =
    "INSERT INTO courses (name, max_seats, start_date, instructor_id) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [name, max_seats, start_date, instructor_id],
    (err, result) => {
      if (err && err.code == "ER_NO_REFERENCED_ROW_2") {
        res.status(400).json({ error: "Instructor not found" });
        return;
      }
      if (err) {
        res.send({
          status: "error",
          err,
        });
      }
      res.send({
        status: "success",
        message: "Course created successfully",
        result,
      });
    }
  );
};
