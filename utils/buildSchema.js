const db = require("../config/database");

exports.buildSchema = async () => {
  const databaseCreate = `CREATE DATABASE IF NOT EXISTS airtribe;`;
  const instructorsTable = `CREATE TABLE IF NOT EXISTS airtribe.instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
  );`;
  const coursesTable = `CREATE TABLE IF NOT EXISTS airtribe.courses (id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    max_seats INT,
    start_date DATE,
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
  );`;
  const leadsTable = `CREATE TABLE IF NOT EXISTS airtribe.leads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20),
      linkedin_profile VARCHAR(255),
      course_id INT,
      status ENUM('Accepted', 'Rejected', 'Waitlist') DEFAULT 'Waitlist',
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );`;
  const commentsTable = `CREATE TABLE IF NOT EXISTS airtribe.comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT NOT NULL,
      lead_id INT,
      instructor_id INT,
      FOREIGN KEY (lead_id) REFERENCES leads(id),
      FOREIGN KEY (instructor_id) REFERENCES instructors(id)
    );`;

  db.query(databaseCreate, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(instructorsTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(coursesTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(leadsTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(commentsTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
};
