const  mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    goals: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    nativeLanguages:{
        type: String,
        required: true
    },

});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;