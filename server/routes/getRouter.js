const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { userInfo } = require("../controllers/getController");

router.get("/userInfo", userInfo);
module.exports = router