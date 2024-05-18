import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ["multipleChoice", "numerical", "programming"],
        default: "multipleChoice"
    },
    incorrectAnswers: {
        type: [String],
        default: []
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
