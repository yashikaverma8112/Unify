// const express = require('express')
// const router = express.Router()

// const answerDB = require('../models/Answer')

// router.post('/' ,async (req,res)=>{
//     try{
//         await answerDB.create({
//             answer :req.body.answer,
//             questionId : req.body.questionId
//         }).then(()=>{
//             res.status(201).send({
//                 status:true,
//                 message:"Answer added Successfully"
//             })
//         }).catch((err)=>{

//             res.status(400).send({
//                 status:false,
//                 message:"Bad request"
//             })
//         })
//     }
//     catch(e){
//         res.status(500).send({
//             status:false,
//             message:"Error while adding answers"
//         })
//     }
// })


// module.exports = router



const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const answerDB = require("../models/Answer");

router.post("/", async (req, res) => {
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});


// Assuming you have an Express.js route for updating answers
router.put("/:answerId", async (req, res) => {
  const { answerId } = req.params; // Extract the answer ID from the URL

  // You can use the answerId to update the specific answer in your database
  try {
    const updatedAnswer = await answerDB.findByIdAndUpdate(
      answerId,
      { answer: req.body.answer },
      { new: true }
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Respond with the updated answer
    res.status(200).json(updatedAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:answerId", async (req, res) => {
  const { answerId } = req.params; // Extract the question ID from the URL

  // You can use the questionId to delete the specific question in your database
  try{
    await answerDB.findByIdAndDelete(new mongoose.Types.ObjectId(answerId))
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


router.put('/:answerId', async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const answers = await answerDB.findById(answerId);

    // Increment the upvotes count for the post
    answers.upvotes += 1;

    // Save the updated post
    await answers.save();

    res.status(200).json({ upvotes: answers.upvotes });
  } catch (error) {
    console.error('Error upvoting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;