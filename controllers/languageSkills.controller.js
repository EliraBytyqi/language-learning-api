const userService = require('../services/users.service'); // missing in your code
const languageSkillsService = require('../services/languageSkills.service');

const createLanguageSkill = async (req, res) => {
    const token = req.header('x-auth-header');
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        
        const user = await userService.findCurrentUser(token);
        if (!user) return res.status(404).json({ msg: "User not found" });
        console.log("User in createLanguageSkill:", user);

        
        const languageSkill = await languageSkillsService.createLanguageSkill(user.id, req.body);

        res.status(201).json(languageSkill); 
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

const updateLanguageSkill = async (req, res) => {
    const token = req.header('x-auth-header');
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const user = await userService.findCurrentUser(token);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const updatedSkill = await languageSkillsService.updateLanguageSkill(
            req.params.id,
            user.id,
            req.body
        );

        res.status(200).json(updatedSkill);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};


const deleteLanguageSkill = async (req, res) => {
    try {
        const deleted = await languageSkillsService.deleteLanguageSkill(req.params.id);
        if (!deleted) return res.status(404).json({ msg: "Language Skill not found" });
        res.status(200).json({ msg: "Language Skill deleted" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

module.exports = {
    createLanguageSkill,
    updateLanguageSkill,
    deleteLanguageSkill
};
