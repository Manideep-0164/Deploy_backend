// Index Page

const express = require("express");;
const app = express();
const {connection} =  require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const { authenticate } = require("./middlewares/athenticate.middleware");
const cors = require("cors")
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use(authenticate)
app.use("/note",noteRouter);


const currPort = process.env.currPort || 3030;

app.listen(currPort,async()=>{
    try{
        await connection;
        console.log("Connected to DB");
        console.log(`Server is running at http://localhost:${currPort}`);
    }
    catch(err){
        console.log(err.message)
    }
})