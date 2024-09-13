const express = require("express");

const router = express.Router();

const { login, signup, getAll, verifyToken, logout } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getAll", getAll);
router.post("/verifyToken", verifyToken)
module.exports=router