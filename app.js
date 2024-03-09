const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Connect to MySQL
const db = require("./config/database");

// Route imports
const courses = require("./routes/coursesRoute");
const instructor = require("./routes/instructorRoute");
const leads = require("./routes/leadsRoute");

app.use("/api/v1", courses);
app.use("/api/v1", instructor);
app.use("/api/v1", leads);

module.exports = app;
