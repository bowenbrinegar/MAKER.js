module.exports = function(sequelize, DataTypes) {
  var Purchases = sequelize.define("Purchases", {
    id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
  })
	Purchases.associate = models => {
    models.Purchases.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
    models.Purchases.belongsTo(models.Products, {
      foreignKey: {
        allowNull: true
      }
    });
  }
  return Purchases;
}
