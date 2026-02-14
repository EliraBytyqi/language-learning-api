const  mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    languageName: {
        type: String,
        required:true,
        unique:true
    }

});


const Language = mongoose.model('Language', languageSchema);
module.exports = Language;