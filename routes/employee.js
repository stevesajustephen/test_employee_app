const express = require("express");
const Employee = require("../models/employee");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:firstName?/:lastName?", [auth, admin], async (req, res) => {
  try {
    const { firstName, lastName } = req.params;
    let employees;
    if (firstName && lastName) {
      employees = await Employee.find().or([{ firstName }, { lastName }]);
    } else if (firstName) {
      employees = await Employee.find({ firstName });
    } else if (lastName) {
      employees = await Employee.find({ lastName });
    } else {
      employees = await Employee.find();
    }
    res.send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/date-range/:start?/:end?", [auth, admin], async (req, res) => {
  try {
    let { start, end } = req.params;
    start = new Date(Number(start));
    end = new Date(Number(end));
    let employees;
    if (start && end) {
      employees = await Employee.find({
        date: { $gte: start, $lt: end },
      });
      res.send(employees);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", [auth, admin], async (req, res) => {
  try {
    let employee = req.body;
    const { eId } = employee;
    const dbUser = await Employee.findOne({ eId });
    if (dbUser) throw "employee already registered";
    employee = new Employee(employee);
    employee = await employee.save();
    res.send(employee);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
