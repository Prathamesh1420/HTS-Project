const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const user = require("./Routes/main");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Mongoose Connected Successfully");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use(cors());
app.use(express.json());
app.use("/user", user);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started at PORT: ${port}`);
});
