const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Connect to MySQL
const db = require("./config/database");

// Route imports
const courses = require("./routes/coursesRoute");

app.use("/api/v1", courses);

module.exports = app;
