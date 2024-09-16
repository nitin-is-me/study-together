const express = require("express");
const { createPublicRoom, getPublicRooms } = require("../controllers/roomController");
const router = express.Router();

router.post("/public/create", createPublicRoom);
router.get("/public/get", getPublicRooms);
module.exports = router;