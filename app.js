const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Connect to MySQL
const db = require("./config/database");

// Route imports
const courses = require("./routes/coursesRoute");
const instructor = require("./routes/instructorRoute");

app.use("/api/v1", courses);
app.use("/api/v1", instructor);

module.exports = app;
