module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: true,
    		len: [2,30]
    	}
    } 
  });

  Users.associate = models => {
  	models.Users.hasMany(models.Products, {
  		onDelete: "CASCADE"
  	});
  };

  return Users;
};
