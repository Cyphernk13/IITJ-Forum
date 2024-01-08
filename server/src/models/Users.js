import mongoose, { mongo } from "mongoose";

const UserSchema = mongoose.Schema({
    username:  String ,
    email: String ,
    password:  String

})


export const UserModel = mongoose.model('User',UserSchema)
