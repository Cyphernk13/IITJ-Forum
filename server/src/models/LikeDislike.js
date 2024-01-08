import mongoose, { mongo } from "mongoose";

const LikeDislikeSchema = mongoose.Schema({
    id : String,
    author : String,
    like : Number,
    dislike : Number,
})

export const LikeDislikeModel = mongoose.model('LikeDislike',LikeDislikeSchema)
