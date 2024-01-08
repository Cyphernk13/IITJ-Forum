import mongoose, { mongo } from "mongoose";

const ReplySchema = mongoose.Schema({
    reply : String,
    commentID: String,
    author : String,
    time: String,
    likes: String,
    dislikes: String,
})

export const ReplyModel = mongoose.model('Reply',ReplySchema)
