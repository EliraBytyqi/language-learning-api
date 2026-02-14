const  mongoose = require('mongoose');

const languageSkillsSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile', 
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language', 
        required: true
    },
    readingLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    speakingLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    writingLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    listeningLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    languageType: {
        type: String,
        enum: ['learned', 'native'],
        required: true
    },
    goalLevel: {
        type: String,
        enum: ['A1','A2','B1','B2','C1','C2'],
        required: false
    },
    targetDate: {
        type: Date
    }
}, {
    timestamps: true 
});

languageSkillsSchema.index({ profile: 1, language: 1 }, { unique: true });

const LanguageSkills = mongoose.model('LanguageSkills', languageSkillsSchema);
module.exports = LanguageSkills;
