const express = require("express");
const userRouter = express.Router();
const {UserModel} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


userRouter.get("",async(req,res)=>{
    try{
        const users = await UserModel.find();
        res.send(users);
    }
    catch(err){
        res.send({"error":err.message})
    }
})



userRouter.post('/register',async(req,res)=>{
    const {email,pass,name,age} = req.body;
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user = new UserModel({name,email,pass:hash,age});
            await user.save();
        })
        // const userName = await UserModel.findOne({email:email})
        res.send({"msg":"Registraion Success"})
    }
    catch(err){
        res.send({"error":err.message});
    }
});




userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.find({email});
        // console.log(user[0]._id)
        if(user.length!=0)
        {
            bcrypt.compare(pass,user[0].pass,async(err,result)=>{
                if(result)
                {
                    const token = jwt.sign({user:user[0]._id},process.env.JWT_SECREAT);
                    res.send({"msg":"Login Successfull", "token":token, "userName":user[0].name})
                }
                else{
                    res.send({"msg":"Wrong Credentials"})
                }
            })
        }
        else{
            res.send({"msg":"Plese Register"});
        }
    }
    catch(err){
        res.send({"error":err.message})
    }
});




module.exports = {
    userRouter,
}