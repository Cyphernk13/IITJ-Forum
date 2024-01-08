import PostMessage from "../models/Users.js"

export const getPosts = async (req,res) => {
    const { username,password } = req.body
    // const user = await UserModel
}
export const createPost  = async (req,res) => {
    const body = req.body
    const newPost = new PostMessage(post)
    try{ 
       await newPost.save() 
       res.status(201).json(newPost) 
    }
    catch(error){
        res.status(409).json({message:error.message})
    }
}