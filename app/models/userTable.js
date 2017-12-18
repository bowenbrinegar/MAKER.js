module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_login: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
  });

  Users.associate = models => {
  	models.Users.hasMany(models.Products, {
  		onDelete: "CASCADE"
  	});
  };

  Users.associate = models => {
    models.Users.hasMany(models.Purchases, {
      onDelete: "CASCADE"
    });
  };

  return Users;
};
