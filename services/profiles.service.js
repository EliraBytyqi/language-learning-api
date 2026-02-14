const userService = require('./users.service');
 const Profile = require('../models/profiles');

const create = async (userId, profile)=>{
    const user = await userService.findUserById(userId);
if(!user){
   throw new Error("User not found!");
}
try{
 const newProfile = new Profile({
    user: userId,
        ...profile
        
 });

 await newProfile.save();
 return newProfile;}
 catch(err){
    throw new Error("Could not save profile!");
 }
}

const findCurrentProfile = async (userId)=>{
    const profile = await Profile.findOne({user: userId});
    if(!profile){
        throw new Error("Profile not found!");
    }
    return profile;

}

const updateProfile = async (userId, updateData) => {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        throw new Error("Profile not found!");
    }

    Object.assign(profile, updateData);

    await profile.save();
    return profile;
};

module.exports = {
    create, findCurrentProfile, updateProfile
}