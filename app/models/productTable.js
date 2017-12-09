module.exports = function (sequelize, DataTypes) {
	var Products = sequelize.define("Products", {
		product: DataTypes.STRING,
		parts: DataTypes.JSON,
		price: DataTypes.STRING,
		cost: DataTypes.STRING,
		description: DataTypes.TEXT
	});

	Products.associate = models => {
    models.Products.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
  };

	return Products;
}