const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createUserByAdminValidator } = require('../validations/validators');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/dashboard', adminController.dashboard);
router.post('/users', createUserByAdminValidator, adminController.createUser);
router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.getUserDetails);
router.get('/stores', adminController.listStores);

module.exports = router;
