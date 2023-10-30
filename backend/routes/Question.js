// const express = require('express')
// const router = express.Router()

// const questionDB = require('../models/Question')
// router.post('/', async(req,res)=>{
//     console.log(req.body)
//     try{
//         await questionDB.create({
//             questionName:req.body.questionName,
//             questionUrl: req.body.questionUrl
//         }).then(()=>{
//             res.status(201).send({
//                 status:true,
//                 message:"Question added Successfully"
//             })
//         }).catch((err)=>{

//             res.status(400).send({
//                 status:false,
//                 message:err
//             })
//         })
//     }
//     catch(e){
//         res.status(500).send({
//             status:false,
//             message:e
//         })
//     }
// });
// router.get('/',async(req,res) =>{
//     try{
//         await questionDB.aggregate([
//             {
//                 $lookup :{
//                     from :"answers",  // collection to join
//                     localField :"_id",  //field from I/P docu
//                     foreignField:"questionId",
//                     as : "allAnswers", //output array field
//                 }
//             }
//         ]).exec()
//           .then((doc)=>{
//             res.status(200).send(doc)
//         }).catch((error)=>{
//             res.status(500).send({
//                 status:false,
//                 message:"Unable tp fetch question details"
//             })
//         })
//      }
//     catch(e){
//         res.status(500).send({
//             status:false,
//             message:"Unexpected Error"
//         })
//     }
// })
// module.exports= router


const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const questionDB = require("../models/Question");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});
// Route to handle POST request for updating a document
router.put("/:questionId", async (req, res) => {
  const { questionId } = req.params; // Extract the answer ID from the URL
  let questionName= req.body.questionName;
  let questionUrl = req.body.questionUrl;
  // You can use the answerId to update the specific answer in your database
  try {
    const updatedQuestion = await questionDB.findByIdAndUpdate(
       new mongoose.Types.ObjectId(questionId),
      //  { questionName: req.body.questionName },
      //  {questionUrl:req.body.questionUrl},
      {$set:{questionName : questionName, questionUrl:questionUrl}},
       {user:req.body.user},
       { new: true },
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Respond with the updated answer
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:questionId", async (req, res) => {
  const { questionId } = req.params; // Extract the question ID from the URL

  // You can use the questionId to delete the specific question in your database
  try{
    await questionDB.findByIdAndDelete(new mongoose.Types.ObjectId(questionId))
    .then((doc) => {
      res.send(doc);
  
    })
    .catch((err) => {
      res.status(400).send({
        staus: false,
        message: "Bad format",
      });
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", //collection to join
            localField: "_id", //field from input document
            foreignField: "questionId",
            as: "allAnswers", //output array field
            
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;