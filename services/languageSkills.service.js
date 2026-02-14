
const profilesService = require('./profiles.service');
const languagesService = require('./languages.service');
const LanguageSkills = require('../models/languageSkills');

const createLanguageSkill = async (userId, skillData) => {
    const profile = await profilesService.findCurrentProfile(userId);
    if (!profile) throw new Error("Cannot create language skill: profile missing");

    const language = await languagesService.findCurrentLanguage(userId);
    if (!language) throw new Error("Cannot create language skill: language missing");

    const newSkillData = {
        profile: profile._id,
        language: language._id,
        ...skillData
    };

    const newSkill = new LanguageSkills(newSkillData);
    await newSkill.save();
    return newSkill;
};

const updateLanguageSkill = async (languageSkillId, userId, updateData) => {
    const profile = await profilesService.findCurrentProfile(userId);
    if (!profile) throw new Error("Profile not found");

    const skill = await LanguageSkills.findById(languageSkillId);
    if (!skill) throw new Error("Language skill not found");

    if (skill.profile.toString() !== profile._id.toString()) {
        throw new Error("Unauthorized to update this language skill");
    }

    Object.assign(skill, updateData);
    await skill.save();

    return skill;
};


const deleteLanguageSkill = async (languageSkillsId) => {
    return await LanguageSkills.findByIdAndDelete(languageSkillsId);
};

module.exports = {
    createLanguageSkill,
    updateLanguageSkill,
    deleteLanguageSkill
};