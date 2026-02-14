const express = require('express');
const router = express.Router();
const languageSkillsController = require('../controllers/languageSkills.controller')
const { auth } = require('../middleware/auth')
const { validateLanguageSkill } = require('../middleware/validators');

router.post('/', auth, validateLanguageSkill, languageSkillsController.createLanguageSkill);
router.delete('/:id', auth, languageSkillsController.deleteLanguageSkill);
router.put('/:id', auth, validateLanguageSkill, languageSkillsController.updateLanguageSkill)

module.exports = router;