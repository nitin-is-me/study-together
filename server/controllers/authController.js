const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { username, name, password } = req.body;
    if (await Student.findOne({ username: username })) {
        res.send("Username already exists!");
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
    const usertoadd = new Student({ username, name, password: hash });
    const addeduser = await usertoadd.save();
    res.status(200).send("Account created successfully")
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Student.findOne({ username });
        if (!user) {
            return res.send("Username doesn't exist, try signing up instead");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {

            const token = jwt.sign({ username: user.username, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2h' });


            res.cookie("Token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV=="production",
                sameSite: "strict",
                expires: new Date((Date.now() + 3600000)*24)
            });

            return res.send("Logged in successfully");
        } else {
            return res.send("Wrong password, try again");
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.send("Internal server error");
    }
}

exports.logout = async (req, res) => {
    res.cookie("Token", '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: '/'
    });
    res.send("Logging you out...");
}

exports.getAll = async (req, res)=>{
    const usertofind = await Student.find();
    res.send(usertofind)
}

exports.verifyToken = async (req, res) => {
    const token = req.cookies.Token;
    if (!token) {
        return res.send('User is unauthorized');
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).send('User is authorized');
    } catch (error) {
        return res.status(401).send('User is unauthorized');
    }
}

exports.userInfo = async(req, res)=>{
    const token = req.cookies.Token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const name = decoded.name;
    const username = decoded.username;
    res.json({name, username});
}
