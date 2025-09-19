const models = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = models.User;
const Rating = models.Rating;
const Store = models.Store;

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return res.status(401).json({ message: 'Old password incorrect' });
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.submitOrUpdateRating = async (req, res) => {
  try {
    const { storeId, stars, comment } = req.body;
    // validate store exists
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // try update
    const existing = await Rating.findOne({ where: { storeId, userId: req.user.id } });
    if (existing) {
      existing.stars = stars; existing.comment = comment;
      await existing.save();
      return res.json({ message: 'Rating updated', rating: existing });
    }
    const rating = await Rating.create({ storeId, userId: req.user.id, stars, comment });
    res.status(201).json({ message: 'Rating submitted', rating });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.getMySubmittedRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { userId: req.user.id },
      include: [{ model: Store, attributes: ['id','name','address'] }]
    });
    res.json(ratings);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
