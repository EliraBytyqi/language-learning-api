const express = require('express');
const router = express.Router();
const languagesController = require('../controllers/languages.controller')
const { validateLanguage } = require('../middleware/validators');
const { auth } = require('../middleware/auth')
const { adminAuth } = require("../middleware/adminAuth");


router.post('/', adminAuth, validateLanguage, languagesController.createLanguage);
router.delete('/:id', adminAuth, languagesController.deleteLanguage);

module.exports = router;