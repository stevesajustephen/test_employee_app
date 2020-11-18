const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  eId: { type: Number, required: true },
  phoneNo: { type: Number, minlength: 5, maxlength: 10, required: true },
  date: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    default: "resetpassword",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
