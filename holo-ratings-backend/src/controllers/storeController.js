const models = require('../models');
const { validationResult } = require('express-validator');
const Store = models.Store;
const Rating = models.Rating;
const User = models.User;

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    if (!name) return res.status(422).json({ message: 'Name required' });
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.getStores = async (req, res) => {
  // accessible to normal users and admin
  try {
    const { q, name, address, page = 1, limit = 50, sortBy = 'name', sort = 'ASC' } = req.query;
    const where = {};
    if (name) where.name = { [models.Sequelize.Op.like]: `%${name}%` };
    if (address) where.address = { [models.Sequelize.Op.like]: `%${address}%` };
    if (q) {
      where[models.Sequelize.Op.or] = [
        { name: { [models.Sequelize.Op.like]: `%${q}%` } },
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

exports.getStoreRatingsForOwner = async (req,res) => {
  // owner sees list of users who rated their store and avg
  try {
    const ownerId = req.user.id;
    const { storeId } = req.params;
    const store = await Store.findOne({ where: { id: storeId, ownerId } });
    if (!store) return res.status(404).json({ message: 'Store not found or not yours' });

    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: User, attributes: ['id','name','email','address'] }],
      attributes: ['id','stars','comment','userId','createdAt']
    });

    const avg = await Rating.findOne({
      where: { storeId },
      attributes: [[models.Sequelize.fn('AVG', models.Sequelize.col('stars')), 'avgRating']]
    });

    res.json({ store, average: avg.get('avgRating') || 0, ratings });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
