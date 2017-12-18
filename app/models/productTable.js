module.exports = function (sequelize, DataTypes) {
	var Products = sequelize.define("Products", {
		product: {
			type: DataTypes.STRING,
		    validate: {
              				len: [2,30]
              			}
              	},
		parts: {
			type: DataTypes.JSON,
              	},
		price: {
			type: DataTypes.STRING,
		    validate: {
                            isNumeric: true,
                            min: 0,
                            max: 1000000
                        }
                },
		cost: {
			type: DataTypes.STRING,
		    validate: {
                            isNumeric: true,
                            min: 0,
                            max: 1000000
                        }
                },
		description: {
			type: DataTypes.TEXT,
		    validate: {
              				min: 1
              			}
              	},
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    collab: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
 });

	Products.associate = models => {
    models.Products.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
    models.Products.hasMany(models.Comments, {
      onDelete: "CASCADE"
    });
    models.Products.hasMany(models.Purchases, {
      onDelete: "CASCADE"
    });
  };

	return Products;
}