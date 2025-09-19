const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { ratingValidator } = require('../validations/validators');

router.use(authMiddleware);

router.post('/password', userController.updatePassword);
router.post('/rating', ratingValidator, userController.submitOrUpdateRating);
router.get('/ratings', userController.getMySubmittedRatings);

module.exports = router;
