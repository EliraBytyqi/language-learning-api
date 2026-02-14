const userService = require('./users.service');
const Language = require('../models/languages');

const create = async (userId, languageData) => {
    const user = await userService.findUserById(userId);
    if (!user) throw new Error("User not found!");

    try {
        const newLanguage = new Language({
            createdBy: userId, 
            ...languageData
        });
        await newLanguage.save();
        return newLanguage;
    } catch (err) {
        throw new Error("Could not save Language! " + err.message);
    }
};

const findCurrentLanguage = async (userId) => {
    const languages = await Language.find({ createdBy: userId });
    if (!languages || languages.length === 0) throw new Error("Language not found!");
    return languages;
};

const deleteLanguage = async (languageId) => {
    const deleted = await Language.findByIdAndDelete(languageId);
    if (!deleted) throw new Error("Language not found!");
    return deleted;
};

module.exports = {
    create,
    findCurrentLanguage,
    deleteLanguage
};
