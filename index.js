const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./router/api");
const app = express();
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));
