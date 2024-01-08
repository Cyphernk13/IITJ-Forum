import mongoose, { mongo } from "mongoose";

const ProfileSchema = mongoose.Schema({
    username: String ,
    year: Number,
    program: String, 
    Branch: String,
    skills: String,   
    linkedIn: String,
    instagram: String,    
    gitHub: String,
    email: String,
    phone: String,
    age: Number, 
    rollNo: String,
    hobbies: String,
    aboutMe: String,
    profilePicture: String,
    bannerPicture: String
})

export const ProfileModel = mongoose.model('Profile',ProfileSchema)
