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

// Get single course details
exports.singleCourseDetails = (req, res) => {
  const courseId = req.params.id;

  const query = `SELECT * FROM airtribe.courses WHERE id = ${courseId}`;

  db.query(query, (err, results) => {
    if (err) {
      res.send({
        status: "error",
        err,
      });
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.json({
      status: "success",
      message: "Course details",
      results,
    });
  });
};

// Update a course
exports.updateCourseDetails = (req, res) => {
  const { name, max_seats, start_date } = req.body;
  const query =
    "UPDATE courses SET name = ?, max_seats = ?, start_date = ? WHERE id = ?";
  db.query(
    query,
    [name, max_seats, start_date, req.params.id],
    (err, result) => {
      if (err) {
        res.send({
          status: "error",
          err,
        });
      }
      res.send({
        status: "success",
        message: "Course updated successfully",
        result,
      });
    }
  );
};

// Delete a course
exports.deleteCourse = (req, res) => {
  // delete the leads associated with the course to remove the reference error.
  const prequery = "DELETE FROM leads WHERE course_id = ?";
  const query = "DELETE FROM courses WHERE id = ?";
  db.query(prequery, [req.params.id], (err, result) => {
    if (err) {
      res.send({
        status: "error deleting the leads associated with the course.",
        err,
      });
    }
  });
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.send({
        status: "error",
        err,
      });
    }
    res.send({
      status: "success",
      warning: "Leads associated with this course have been deleted.",
      message: "Course deleted successfully",
      result,
    });
  });
};
