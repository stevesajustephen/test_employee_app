const express = require("express");
const mongoose = require("mongoose");
const employees = require("./routes/employee");
const admin = require("./routes/admin");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  console.log("home");
  res.send("home page");
});

app.use("/employees", employees);
app.use("/admin", admin);

mongoose.connect("mongodb://localhost:27017/AdminPanel", () => {
  console.log("database connected..");
});

app.listen(3000, async () => {
  console.log("listening to port 3000..");
});
