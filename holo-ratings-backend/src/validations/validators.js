const { body } = require('express-validator');

const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

const signupValidator = [
  body('name').isLength({ min: 2, max: 60 }).withMessage('Name must be 2-60 chars'),
  body('email').isEmail().withMessage('Invalid email'),
  body('address').isLength({ max: 400 }).optional({ nullable: true }),
  body('password').matches(passwordRegex).withMessage('Password must be 8-16 chars with at least 1 uppercase and 1 special char'),
  body('role').isIn(['user','owner']).optional().withMessage('Role must be user or owner')
];

const loginValidator = [
  body('email').isEmail(),
  body('password').isString()
];

const createUserByAdminValidator = [
  body('name').isLength({ min: 2, max: 60 }),
  body('email').isEmail(),
  body('address').isLength({ max: 400 }).optional({ nullable: true }),
  body('password').matches(passwordRegex),
  body('role').isIn(['admin','user','owner'])
];

const ratingValidator = [
  body('storeId').isInt().withMessage('Invalid storeId'),
  body('stars').isInt({ min:1, max:5 }).withMessage('Stars must be 1-5'),
  body('comment').isLength({ max:1000 }).optional({ nullable: true })
];

module.exports = {
  signupValidator, loginValidator, createUserByAdminValidator, ratingValidator
};
