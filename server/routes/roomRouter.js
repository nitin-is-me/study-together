const express = require("express");
const { createPublicRoom, getPublicRooms, getPublicRoomById } = require("../controllers/roomController");
const router = express.Router();

router.post("/public/create", createPublicRoom);
router.get("/public/get", getPublicRooms);
router.get("/public/get/:id", getPublicRoomById);
module.exports = router;