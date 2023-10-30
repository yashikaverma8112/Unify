// const mongoose =require('mongoose')

// const AnswerSchema = new mongoose.Schema({
//     answer:String,
//     questionId :{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"questions"
//     },
//     createdAt: {
//         type:Date,
//         default:Date.now()
//     }, 
// }) 
// module.exports=mongoose.model("Answers",AnswerSchema);



const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: String,
  answerId : String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  upvotes: {
    type: Number,
    default: 0, // Default to 0 upvotes
  },
  user: Object,
});

module.exports = mongoose.model("Answers", AnswerSchema);