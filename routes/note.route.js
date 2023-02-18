const { authenticate } = require("../middlewares/athenticate.middleware");
const { NotesModel } = require("../models/notes.model");

const noteRouter = require("express").Router();

noteRouter.post("/add",async(req,res)=>{
    const userNote = req.body;
    try{
        const note = new NotesModel(userNote);
        await note.save();
        res.send({"msg":"A note added"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});

noteRouter.get("/get",async(req,res)=>{
    const { author } = req.body
    try{
        const note = await NotesModel.find({author});
        if(note.length!=0) res.send(note);
        else res.send({"msg":"No Data"})
    }
    catch(err){
        res.send({"error":err.message});
    }
});

noteRouter.delete("/delete/:id",async(req,res)=>{
    const { id } = req.params;
    try{
        const data = await NotesModel.find({_id:id});
        if(data.length!=0){
            await NotesModel.findByIdAndDelete({_id:id})
            res.send({"msg":"A note Deleted"});
        }
        else res.send({"msg":"Unable to Delete","error":"No document exist with the given id"})
    }
    catch(err){
        res.send({"error":err.message});
    }
});



module.exports = {
    noteRouter,
}

