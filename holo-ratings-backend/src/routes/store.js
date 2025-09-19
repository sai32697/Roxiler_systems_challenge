const router = require('express').Router();
const storeController = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// admin can create store
router.post('/', roleMiddleware(['admin']), storeController.createStore);

// everyone authenticated can view stores (user, admin)
router.get('/', storeController.getStores);

// owner specific
router.get('/:storeId/owner', roleMiddleware(['owner']), storeController.getStoreRatingsForOwner);

module.exports = router;
