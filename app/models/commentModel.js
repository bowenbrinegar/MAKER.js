module.exports = function(sequelize, DataTypes) {
	var Comments = sequelize.define("Comments", {
		comment: DataTypes.TEXT,
    like: DataTypes.INTEGER
	})

	Comments.associate = models => {
    models.Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
    models.Comments.belongsTo(models.Products, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Comments;
};