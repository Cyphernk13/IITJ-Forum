import mongoose, { mongo } from "mongoose";

const QuestionSchema = mongoose.Schema({
    question : String,
    author : String,
    time: String,
    category: String,
})

export const QuestionModel = mongoose.model('Question',QuestionSchema)
 