const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, defualt: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
