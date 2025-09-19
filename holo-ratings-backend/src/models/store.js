const { DataTypes, Model } = require('sequelize');

class Store extends Model {}

module.exports = (sequelize) => {
  Store.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    email: { type: DataTypes.STRING(255) },
    address: { type: DataTypes.STRING(400) },
    ownerId: { type: DataTypes.INTEGER.UNSIGNED }
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'stores',
    timestamps: true
  });

  return Store;
};
