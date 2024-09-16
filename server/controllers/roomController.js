const PublicRoom = require("../models/PublicRoom");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

exports.createPublicRoom = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("Room name and description are required.");
  }

  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(401).send("No token provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    const usertofind = await Student.findOne({ username });
    if (!usertofind) {
      return res.status(404).send("User not found.");
    }

    const userId = usertofind._id;

    const newRoom = new PublicRoom({
      name,
      description,
      users: [userId],
      admin: userId,
    });

    const newRoomToSave = await newRoom.save();
    res.send(newRoomToSave);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

exports.getPublicRooms = async (req, res) => {
  try {
    const rooms = await PublicRoom.find().populate('admin', 'name');
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

exports.getPublicRoomById = async(req, res) =>{
  try {
    const{ id } = req.params;
    const room = await PublicRoom.findOne({_id: id}).populate('admin', 'name');
    res.json(room)
  } catch (error) {
    res.status(500).send("Interal server error");
  }
}