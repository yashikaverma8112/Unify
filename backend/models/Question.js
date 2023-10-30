

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  questionId : String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
  },
  user: Object,
});

module.exports = mongoose.model("Questions", QuestionSchema);