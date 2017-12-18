module.exports = function(sequelize, DataTypes) {
	var Comments = sequelize.define("Comments", {
		comment: DataTypes.TEXT
	})

	Comments.associate = models => {
    models.Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Comments;
};