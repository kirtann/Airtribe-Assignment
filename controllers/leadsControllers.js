const db = require("../config/database");

// Get all leads
exports.getAllLeads = (req, res) => {
  // Query to get all leads
  const query = `SELECT * FROM airtribe.leads`;

  // Execute query
  db.query(query, (err, results) => {
    if (err) {
      res.send({
        status: "error",
        err,
      });
    }

    // Check if lead exists
    if (results.length === 0) {
      res.status(404).json({
        status: "error",
        error: "No Leads found. Please Register New Lead",
      });
      return;
    }

    // Return leads
    res.json({
      status: "success",
      message: "Leads fetched successfully",
      results,
    });
  });
};

// Register a new lead
exports.registerCourse = (req, res) => {
  const { name, email, phone_number, linkedin_profile, course_id } = req.body;
  const query =
    "INSERT INTO leads (name, email, phone_number, linkedin_profile, course_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, email, phone_number, linkedin_profile, course_id],
    (err, result) => {
      if (err && err.code == "ER_NO_REFERENCED_ROW_2") {
        res.status(400).json({ status: "error", error: "Course not found" });
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
        message: "Lead registered successfully",
        result,
      });
    }
  );
};

// Update a lead status
exports.updateLead = (req, res) => {
  const { status } = req.body;
  const query = "UPDATE leads SET status = ? WHERE id = ?";
  db.query(query, [status, req.params.id], (err, result) => {
    if (err && err.code === "ER_NO_REFERENCED_ROW_2") {
      res.status(400).json({ error: "Lead not found" });
      return;
    }
    if (err && err.code == "WARN_DATA_TRUNCATED") {
      res.status(400).json({
        status: "error",
        error:
          "Invalid status value, please enter Accepted, Rejected or Waitlist",
      });
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
      message: "Lead updated successfully",
      result,
    });
  });
};

// Search for leads
exports.searchLeads = (req, res) => {
  const { name, email } = req.query;
  const query = `SELECT * FROM airtribe.leads WHERE name LIKE ? OR email = ?`;
  const searchTerm = `%${name || ""}%`;
  const searchEmail = email || "";
  db.query(query, [searchTerm, searchEmail], (err, results) => {
    if (err) {
      res.send({
        status: "error",
        err,
      });
    }
    res.send({
      status: "success",
      message: "Leads search results",
      results,
    });
  });
};
