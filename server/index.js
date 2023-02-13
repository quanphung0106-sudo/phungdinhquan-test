const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const route = require("./src/routes/index");

dotenv.config();
const port = 8801;

app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));

route(app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the MongoDB!");
  })
  .catch((error) => {
    console.log(`Can not connect to database, ${error}`);
  });

app.listen(port, () => {
  console.log(`Connected to server with port: ${port}`);
});
