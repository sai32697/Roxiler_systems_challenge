const router = require('express').Router();
const authController = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validations/validators');

router.post('/signup', signupValidator, authController.signup);
router.post('/login', loginValidator, authController.login);

module.exports = router;
