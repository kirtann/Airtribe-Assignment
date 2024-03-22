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

// Question to get data from three table and sending result
exports.getThreeTableData = async (req, res) => {
  const query1 = "SELECT * FROM comments";
  const query2 = "SELECT * FROM courses";
  const query3 = "SELECT * FROM instructors";
  let resu = {};

  const result1 = new Promise((resolve, reject) => {
    db.query(query1, (err, result) => {
      if (err) {
        res.send(err);
        return;
      } else {
        // Was using promises but wrong resolve statement
        resolve(result);
      }
    });
  });

  const result2 = new Promise((resolve, reject) => {
    db.query(query2, (err, result) => {
      if (err) {
        res.send(err);
        return;
      } else {
        resolve(result);
      }
    });
  });

  const result3 = new Promise((resolve, reject) => {
    db.query(query3, (err, result) => {
      if (err) {
        res.send(err);
        return;
      } else {
        resolve(result);
      }
    });
  });

  // Got stuck at this point as I didn't remember the way to append the data into an object
  await Promise.all([result1, result2, result3]).then((values) => {
    resu = {
      comments: { ...values[0] },
      courses: { ...values[1] },
      instructors: { ...values[2] },
    };
  });

  res.send({
    status: "success",
    data: resu,
  });
};
