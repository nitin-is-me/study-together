const mongoose=require("mongoose");
const schema=mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Student=mongoose.model("students", schema);
module.exports=Student