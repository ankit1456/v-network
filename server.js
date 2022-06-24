require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("Database connected successfully 😀😀");
});

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});
const server = app.listen(port, () =>
  console.log(`listening on http://localhost:${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UnhandledRejection , shutting down 😶");
  server.close(() => {
    process.exit(1);
  });
});
