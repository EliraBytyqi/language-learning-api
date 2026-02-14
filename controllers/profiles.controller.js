const User = require("../models/users");
const profileService = require('../services/profiles.service');
const userService = require("../services/users.service");

const createProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        
        const profile = await profileService.create(userId, req.body);
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
    
}


const getCurrentProfile = async (req, res) => {
    const token = req.header('x-auth-header');
    try {
        const user = await userService.findCurrentUser(token);
        const profile = await profileService.findCurrentProfile(user.id);
        res.status(200).json({ profile });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const updateProfile = async (req, res) => {
    const token = req.header('x-auth-header');

    try {
        const user = await userService.findCurrentUser(token);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const updatedProfile = await profileService.updateProfile(
            user.id,
            req.body
        );

        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

module.exports = {
    createProfile, getCurrentProfile, updateProfile
}