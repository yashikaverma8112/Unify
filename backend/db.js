const mongoose = require('mongoose');
const url = "";

module.exports.connect =()=>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("mongoDb connected")
    }).catch((error)=>console.log(error));
}
