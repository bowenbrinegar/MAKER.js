module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Users.associate = models => {
  	models.Users.hasMany(models.Products, {
  		onDelete: "CASCADE"
  	});
  };

  return Users;
};
