const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRoute = require("./routes/movies");
const genreRoute = require("./routes/genres");
const userRoute = require("./routes/users");

const app = express();

//To prevent CORS errors
app.use(cors());

//Connecting mongoDB
const databaseConfig = require("./config/keys");
console.log(databaseConfig);
mongoose.connect(databaseConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
