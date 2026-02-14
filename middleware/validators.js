const { body, validationResult } = require('express-validator');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const validateRegister = [
    body('fullName').notEmpty().isString().withMessage('fullName is required and must be string'),
    body('email').notEmpty().isEmail().withMessage("Email is required and must be valid"),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password is required and must have at least 6 chars'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
    validate
];


const validateLogin = [
    body('email').notEmpty().isEmail().withMessage("Email is required and must be valid"),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

const validateProfile = [
    body("goals").optional().isString().withMessage("Your goals must be string"),
    body("country").notEmpty().isString().withMessage("Your country is required"),
    body("nationality").notEmpty().isString().withMessage("Your nationality is required"),
    body("nativeLanguages").notEmpty().isString().withMessage("Your native language(s) is(are) required"),
    validate
];

const validateLanguage = [
    body("languageName").notEmpty().isString().withMessage("the language name is required and must be string"),
    validate
];
const validateLanguageSkill = [
    body('language').notEmpty().isMongoId().withMessage('language ID is required and must be valid'),
    body('readingLevel')
        .notEmpty()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('readingLevel is required and must be beginner, intermediate, or advanced'),
    body('speakingLevel')
        .notEmpty()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('speakingLevel is required and must be beginner, intermediate, or advanced'),
    body('writingLevel')
        .notEmpty()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('writingLevel is required and must be beginner, intermediate, or advanced'),
    body('listeningLevel')
        .notEmpty()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('listeningLevel is required and must be beginner, intermediate, or advanced'),
    body('languageType')
        .notEmpty()
        .isIn(['learned', 'native'])
        .withMessage('languageType is required and must be learned or native'),
    body('goalLevel')
        .optional()
        .isIn(['A1','A2','B1','B2','C1','C2'])
        .withMessage('goalLevel must be one of A1, A2, B1, B2, C1, C2'),
    body('targetDate')
        .optional()
        .isISO8601()
        .toDate()
        .custom(date => {
            if (date && date < new Date()) {
                throw new Error('targetDate must be in the future');
            }
            return true;
        }),
    validate
];

module.exports = {
    validateRegister,
    validateLogin,
    validateProfile,
    validateLanguage,
    validateLanguageSkill
};
