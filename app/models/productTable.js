module.exports = function (sequelize, DataTypes) {
	var Products = sequelize.define("Products", {
		product: DataTypes.STRING,
		price: DataTypes.INTEGER,
		cost: DataTypes.INTEGER,
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