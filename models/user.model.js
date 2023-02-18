const mongoose = require("mongoose");

const userStruct = mongoose.Schema({
    name:{type:String,requiered:true},
    email:{type:String, requiered:true},
    pass:{type:String, requiered:true},
    age:{type:Number, requiered:true}
},{ versionKey:false });

const UserModel = mongoose.model("user",userStruct);

module.exports = {
    UserModel,
}