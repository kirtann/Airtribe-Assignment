const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_DATABASENAME,
});

module.exports = db;
