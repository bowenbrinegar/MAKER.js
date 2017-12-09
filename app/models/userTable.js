module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: DataTypes.STRING
  });

  Users.associate = models => {
  	models.Users.hasMany(models.Products, {
  		onDelete: "CASCADE"
  	});
  };

  return Users;
};
