const jwt = require("jsonwebtoken");

exports.userInfo = async(req, res)=>{
    const token = req.cookies.Token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const name = decoded.name;
    const username = decoded.username;
    res.json({name, username});
}