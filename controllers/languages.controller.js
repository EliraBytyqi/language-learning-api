const languageService = require('../services/languages.service');
const userService = require("../services/users.service");

const createLanguage = async (req, res) => {
    try {
        const userId = req.user.id; 
        const language = await languageService.create(userId, req.body);
        res.status(201).json(language); 
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

const getCurrentLanguage = async (req, res) => {
    try {
        const languages = await languageService.findCurrentLanguage(req.user.id);
        res.status(200).json(languages);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};


const deleteLanguage = async (req, res) => {
    try {
        const deleted = await languageService.deleteLanguage(req.params.id);
        res.status(200).json({ msg: "Language deleted", deleted });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

module.exports = {
    createLanguage,
    deleteLanguage,
    getCurrentLanguage
};
