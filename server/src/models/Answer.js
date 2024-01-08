import mongoose, { mongo } from "mongoose";

const AnswerSchema = mongoose.Schema({
    answer : String,
    questionID: String,
    author : String,
    time: String,
    likes: Number,
    dislikes: Number,
})

export const AnswerModel = mongoose.model('Answer',AnswerSchema)
