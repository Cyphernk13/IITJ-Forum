import express from "express";
import { ProfileModel } from '../models/Profile.js';

const router = express.Router();

router.post('/update', async (req, res) => {
    try { 
        const userData = req.body;
        const email = userData.email;
        const existingProfile = await ProfileModel.findOne({ email });
        console.log(userData)
        if (existingProfile) {
            const updateObject = {};

            for (const key in userData) {
                if (userData[key] !== "") {
                    updateObject[key] = userData[key];
                }
            }

            if (Object.keys(updateObject).length > 0) {
                Object.assign(existingProfile, updateObject);

                await existingProfile.save();

                res.json('OK');
                // console.log('Profile updated');
            } else {
                res.status(400).json('No valid fields to update');
                // console.log('No valid fields to update');
            }
        } else {
            res.status(404).json('Profile not found');
            // console.log('Profile not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.post('/getUser',async (req,res) => {
    const { email } = req.body
    console.log(email)
    const Profile = await ProfileModel.findOne({ email });
    if (Profile) {
        res.json(Profile)
    }else{
        res.json("")
    }
})


export default router;
