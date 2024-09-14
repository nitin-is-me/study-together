const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRouter");
const roomRouter = require("./routes/roomRouter");
const port = process.env.PORT || 5000
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
})();

app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.listen(8000, () => {
    console.log(`Server is running on port ${port}`);
})