import mongoose, { mongo } from "mongoose";

const CommentSchema = mongoose.Schema({
    comment : String,
    answerID: String,
    author : String,
    time: String,
    likes: String,
    dislikes: String, 
})

export const CommentModel = mongoose.model('Comment',CommentSchema)
