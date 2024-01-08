import express from "express";
import { QuestionModel } from '../models/Question.js';
import { AnswerModel } from '../models/Answer.js';
import { CommentModel } from '../models/Comment.js';
import { ReplyModel } from '../models/Reply.js';
import axios from "axios";
import { LikeDislikeModel } from "../models/LikeDislike.js";
const router = express.Router();

router.post('/question' , async( req,res ) => {
    const question = req.body 
    const newQuestion = new QuestionModel(question)
    await newQuestion.save()
    res.json('qDONE')
})

router.post('/answer',async(req,res) =>{
    const answer = req.body 
    const newQuestion = new AnswerModel(answer)
    await newQuestion.save()
    res.json('aDONE')
})

router.post('/comment',async(req,res) =>{
    const comment = req.body 
    const newQuestion = new CommentModel(comment)
    await newQuestion.save()
    res.json('cDONE')
})

router.post('/reply',async(req,res) =>{
    const reply = req.body 
    const newQuestion = new ReplyModel(reply)
    await newQuestion.save()
    res.json('rDONE')
}) 

router.post('/viewQuestion',async(req,res) =>{
    const { questionID } = req.body
    const question = await QuestionModel.findOne({ _id:questionID })
    const answers = await AnswerModel.find({ questionID });

    const answersWithComments = await Promise.all(answers.map(async (answer) => {
      const comments = await CommentModel.find({ answerID: answer._id });
      const commentsWithReplies = await Promise.all(comments.map(async (comment) => ({
        comment,
        replies: await ReplyModel.find({ commentID: comment._id })
      })))
      return { answer, comments:commentsWithReplies.reverse() }
    }))
    
    res.json({question,answers: answersWithComments.reverse()})
})  

router.post('/viewAllQuestions',async(req,res) => {
    const { category } = req.body
    const questions = await QuestionModel.find({ category })
    const data = await Promise.all( questions.map( async( question ) => ({
        question,
        answer: await AnswerModel.findOne({ questionID: question._id })
    }) )  )

    res.json(data.reverse(  ))
})

router.post('/search', async (req, res) => {
    try { 
      const { q } = req.body;
      const questions = await QuestionModel.find({}, { _id: 1, question: 1 });
      const results = []; 
      for (const question of questions) {
        const answers = await AnswerModel.find({ questionID: question._id }, { answer: 1 });
        const concatenatedString = answers.reduce((result, currentString) => {
            return result + currentString.answer + " ";
          }, '');
        const resultItem = {
          id: question._id,
          question: question.question,
          answer: concatenatedString,
        };
        results.push(resultItem);
      }
      
      const flaskResponse = await axios.post('http://127.0.0.1:5000/find_most_similar', {results,q});

      res.json(flaskResponse.data);
    } catch (error) {
      console.error('Error sending data to Flask:', error.message);
      res.status(500).json({ error });
    }
});
  
router.post( '/likeDislikeFetch',async(req,res) => {
  const { id , author } = req.body

  const data = await LikeDislikeModel.findOne({id,author}, { like:1 , dislike : 1 })
  console.log(data) 
  if ( data ) {res.json(data)}
  else {  
    const newData = new LikeDislikeModel({id,author,like:-1,dislike:-1})
    await newData.save()
    res.json({like:-1,dislike:-1}) 
  }    
})

router.post( '/likeDislikeUpdateUser' , async(req,res) =>  {
  try {
    const data = req.body;
    console.log(data,"update user")
    const filter = { id: data.id, author: data.user };
    const update = { $set: { like: data.like, dislike: data.dislike } };
    const options = { upsert: true };
    const result = await LikeDislikeModel.updateMany(filter, update, options);
 
    if (result.upsertedCount === 1) {
      res.json({ success: true, message: 'New record created successfully' });
    } else if (result.modifiedCount === 1) {
      res.json({ success: true, message: 'Like and dislike updated successfully' });
    } else {
      res.json('tmkb')
    }
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})
 
router.post('/likeDislikeUpdatePost',async(req,res) => {
  try{
    const { type , id ,likes , dislikes } = req.body;
    var result = "" 
    console.log(req.body,"updatePOSt")
    if (type == "answer") {
      result = await AnswerModel.updateOne({_id:id }, {$set:{likes,dislikes}});
    }else if (type == "comment") {
      result = await CommentModel.updateOne({_id:id }, {$set:{likes,dislikes}});
    }else if (type == "reply") {
      result = await ReplyModel.updateOne({_id:id }, {$set:{likes,dislikes}});
    }
    res.json(result)
  }catch(err){
    console.error(err)
  }
})



export default router 