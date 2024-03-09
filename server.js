const app = require("./app");

const dotenv = require("dotenv");
const { buildSchema } = require("./utils/buildSchema");

dotenv.config({ path: "./config/config.env" });

buildSchema();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
