const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const config = require("../config/config.json");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("admin panel");
});

//admin reg
router.post("/", async (req, res) => {
  try {
    let admin = req.body;
    const { userName } = admin;
    const dbUser = await Admin.findOne({ userName });
    if (dbUser) throw "user already registered";
    admin = new Admin(admin);
    admin = await admin.save();
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      config.secretKey
    );
    res.send(token);
  } catch (err) {
    res.send(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const { userName, password } = user;
    const dbUser = await Admin.findOne({ userName });
    if (dbUser && dbUser.password === password) {
      const token = jwt.sign(
        { _id: dbUser._id, isAdmin: dbUser.isAdmin, userName: dbUser.userName },
        config.secretKey
      );
      res.send(token);
    } else {
      res.send("user not found/ wrong password");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
