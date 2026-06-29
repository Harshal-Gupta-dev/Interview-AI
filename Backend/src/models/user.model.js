const mongoose= require("mongoose")

const userModelSchema= mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already Exist"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Email already Exist"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel= mongoose.model("user",userModelSchema)

module.exports=userModel;
