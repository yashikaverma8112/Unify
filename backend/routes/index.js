const express = require("express");
const router = express.Router();
const cors = require('cors');
const app = express();
app.use(cors());
const questionRouter = require('./Question');
const answerRouter = require('./Answer');
const chatRouter = require('./Chat');
const UpdateRouter = require('./UpdateRouter');
const Delete = require("./Delete");
router.get('/',(req,res)=>{
    res.send("This API is reserved for JU")
})
router.use('/questions',questionRouter);
router.use('/questions/:questionId',questionRouter);
router.use('/questions/del/:questionId',questionRouter);
router.use('/updateques/:_id',UpdateRouter);
router.use('/updateans/:_id',UpdateRouter);
// app.put('/update/:questionId',UpdateRouter);
router.use('/answers',answerRouter);    
router.use('/answers/:answerId',answerRouter);    
router.use('/answers/upvote/:answerId',answerRouter);    
router.use('/answers/del/:answerId',answerRouter);    
router.delete('/delques/:_id',Delete);
router.delete('/delans/:_id',Delete);

router.use('/comment',chatRouter);
router.use('/comment/get',chatRouter);


module.exports = router