const models = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = models.User;
const Store = models.Store;
const Rating = models.Rating;

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req); if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, address, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email exists' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    const hashed = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, address, password: hashed, role });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.listUsers = async (req, res) => {
  try {
    const { q, role, sortBy = 'name', sort = 'ASC', page = 1, limit = 50 } = req.query;
    const where = {};
    if (role) where.role = role;
    if (q) {
      where[models.Sequelize.Op.or] = [
        { name: { [models.Sequelize.Op.like]: `%${q}%` } },
        { email: { [models.Sequelize.Op.like]: `%${q}%` } },
        { address: { [models.Sequelize.Op.like]: `%${q}%` } }
      ];
    }
    const users = await User.findAll({
      where, order: [[sortBy, sort]], attributes: ['id','name','email','address','role']
    });
    res.json(users);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.listStores = async (req, res) => {
  try {
    const { q, sortBy = 'name', sort = 'ASC' } = req.query;
    const where = {};
    if (q) {
      where[models.Sequelize.Op.or] = [
        { name: { [models.Sequelize.Op.like]: `%${q}%` } },
        { email: { [models.Sequelize.Op.like]: `%${q}%` } },
        { address: { [models.Sequelize.Op.like]: `%${q}%` } }
      ];
    }
    const stores = await Store.findAll({
      where,
      include: [{
        model: Rating,
        attributes: []
      }],
      attributes: {
        include: [
          [models.Sequelize.fn('AVG', models.Sequelize.col('ratings.stars')), 'avgRating'],
          [models.Sequelize.fn('COUNT', models.Sequelize.col('ratings.id')), 'ratingCount']
        ]
      },
      group: ['Store.id'],
      order: [[sortBy, sort]],
      raw: true
    });
    res.json(stores);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: ['id','name','email','address','role'] });
    if (!user) return res.status(404).json({ message: 'Not found' });

    // if owner, include their store average rating(s)
    if (user.role === 'owner') {
      const stores = await Store.findAll({
        where: { ownerId: user.id },
        include: [{ model: Rating, attributes: [] }],
        attributes: ['id','name','email','address',
          [models.Sequelize.fn('AVG', models.Sequelize.col('ratings.stars')), 'avgRating']
        ],
        group: ['Store.id'],
        raw: true
      });
      return res.json({ user, stores });
    }
    res.json({ user });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
