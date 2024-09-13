const express = require("express");

const router = express.Router();

const { login, signup, getAll, verifyToken } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAll", getAll);
router.post("/verifyToken", verifyToken)
module.exports=router