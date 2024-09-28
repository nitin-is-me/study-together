const express = require("express");
const { createPublicRoom, getPublicRooms, getPublicRoomById, createPrivateRoom, getPrivateRoom } = require("../controllers/roomController");
const router = express.Router();

//public routes here
router.post("/public/create", createPublicRoom);
router.get("/public/get", getPublicRooms);
router.get("/public/get/:id", getPublicRoomById);

//private routes here
router.post("/private/create", createPrivateRoom);
router.get("/private/get", getPrivateRoom);
module.exports = router;