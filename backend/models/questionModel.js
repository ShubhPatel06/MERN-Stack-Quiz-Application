import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  data: {
    options: [
      {
        uuid: {
          type: String,
          required: true,
        },
        text: String,
      },
    ],
    correctAnswer: [String],
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
