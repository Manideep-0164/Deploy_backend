const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    note:{type:String, required:true},
    category:{type:String, required:true},
    author:{type:String, required:true}
},{ versionKey:false});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = {
    NotesModel,
}