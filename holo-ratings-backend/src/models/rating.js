const { DataTypes, Model } = require('sequelize');

class Rating extends Model {}

module.exports = (sequelize) => {
  Rating.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    stars: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.STRING(1000) },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    storeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['storeId'] },
      { unique: true, fields: ['userId', 'storeId'] }
    ]
  });

  return Rating;
};
