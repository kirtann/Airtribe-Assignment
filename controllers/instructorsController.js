const db = require("../config/database");

// Get all instructors
exports.getAllInstructors = (req, res) => {
  // Query to get all instructors
  const query = `SELECT * FROM airtribe.instructors`;

  // Execute query
  db.query(query, (err, results) => {
    if (err) {
      res.send(err);
      throw err;
    }

    // Check if instructor exists
    if (results.length === 0) {
      res
        .status(404)
        .json({ error: "No Instructors found. Please Create New Instructor" });
      return;
    }

    // Return instructors
    res.json({
      status: "success",
      message: "Instructors fetched successfully",
      results,
    });
  });
};

// Create a new instructor
exports.createInstructor = (req, res) => {
  const { name, email, phone_number } = req.body;
  const query =
    "INSERT INTO instructors (name, email, phone_number) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone_number], (err, result) => {
    if (err) {
      res.send(err);
      throw err;
    }
    res.send({
      status: "success",
      message: "Instructor created successfully",
      result,
    });
  });
};

// Get single instructor details
exports.singleInstructorDetails = (req, res) => {
  const instructorId = req.params.id;

  const query = `SELECT * FROM airtribe.instructors WHERE id = ${instructorId}`;

  db.query(query, (err, results) => {
    if (err) {
      res.send(err);
      throw err;
    }

    // Check if instructor exists
    if (results.length === 0) {
      res.status(404).json({ error: "Instructor not found" });
      return;
    }

    // Return instructor details
    res.json({
      status: "success",
      message: "Instructor fetched successfully",
      results,
    });
  });
};

// Update instructor details
exports.updateInstructorDetails = (req, res) => {
  const instructorId = req.params.id;
  const { name, email, phone_number } = req.body;
  const query = `UPDATE airtribe.instructors SET name = ?, email = ?, phone_number = ? WHERE id = ?`;

  db.query(query, [name, email, phone_number, instructorId], (err, result) => {
    if (err) {
      res.send(err);
      throw err;
    }
    res.send({
      status: "success",
      message: "Instructor details updated successfully",
      result,
    });
  });
};

// Get all courses by instructor
exports.getCoursesByInstructor = (req, res) => {
  const instructorId = req.params.id;

  const query = `SELECT * FROM airtribe.courses WHERE instructor_id = ${instructorId}`;

  db.query(query, (err, results) => {
    if (err) {
      res.send(err);
    }
    // Check if courses exists
    if (results.length === 0) {
      res.status(404).json({
        error: "Instructor id wrong or no Courses found for Instructor",
      });
      return;
    }

    res.send({
      status: "success",
      message: "Courses fetched successfully",
      results,
    });
  });
};
