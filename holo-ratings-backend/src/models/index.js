const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');

const User = require('./user')(sequelize);
const Store = require('./store')(sequelize);
const Rating = require('./rating')(sequelize);

// Associations
User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId', onDelete: 'CASCADE' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Store,
  Rating
};
