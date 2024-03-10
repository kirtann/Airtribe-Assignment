const app = require("./app");

const dotenv = require("dotenv");
const { buildSchema } = require("./utils/buildSchema");

dotenv.config();

const db = require("./config/database");

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to DB successfully");
});

buildSchema();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
