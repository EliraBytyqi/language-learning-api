const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profiles.controller')
const {validateProfile} = require('../middleware/validators');
const {auth} = require('../middleware/auth')


router.post('/',auth, validateProfile, profileController.createProfile);
router.get('/me', auth,  profileController.getCurrentProfile);
router.put('/',auth, validateProfile, profileController.updateProfile);

module.exports = router;