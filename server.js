const express = require("express");
const mongoose = require("mongoose");
const segmentsRoutes = require("./routes/segmentRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const playerRoutes = require("./routes/playerRoute");
const app = express();
require("dotenv").config();

// dotenv

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Apply CORS middleware here

// Database connection
const dbURI = process.env.CONNECT_STRING;

// Port
const port = process.env.PORT;
console.log(port);

// Connect to MongoDB and start the server
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, () => {
      console.log(`Listening to port: ${port}`);
    })
  )
  .catch((err) => console.log(err));

// Routes
app.use(segmentsRoutes);
app.use(playerRoutes);
