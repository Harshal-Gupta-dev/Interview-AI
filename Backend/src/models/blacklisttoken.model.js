const mongoose= require("mongoose")


const blacklistModelSchema= mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistModelSchema);

module.exports=blacklistTokenModel;