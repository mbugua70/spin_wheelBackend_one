require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const segmentsRoutes = require("./routes/segmentRoute");
const cookieParser = require("cookie-parser");

const playerRoutes = require("./routes/playerRoute");
const app = express();

// dotenv

// app.use(cors());
const corsOptions = {
  origin: "*", // You might want to change this to a specific domain in production for security reasons
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Explicitly allow PATCH
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

// Routes
app.use(segmentsRoutes);
app.use(playerRoutes);

// cmment
