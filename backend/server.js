const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const db = require('./db');
const router = require("./routes");

db.connect();

app.use(cors());
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))

app.use((req,res,next)=>{
    req.header("Accesss-Control-Allow-Origin","*")
    req.header("Accesss-Control-Allow-Headers","*")
    next()
})

app.use('/api',router)

app.use('/uploads',express.static(path.join(__dirname,"/../uploads")));
app.use(express.static(path.join(__dirname,"/../frontend/build")));

app.get("*",(req,res)=>{
    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    }
    catch(e){
        res.send("Oops! Unexpected error");
    }
})



app.listen(process.env.PORT || 80,()=>{
    console.log("server connected to port")
})