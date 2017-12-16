const sequelizeTransforms = require('sequelize-transforms');


module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
   email: {
      type: DataTypes.STRING,
      notEmpty: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true
      },
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false
    }
  });

  sequelizeTransforms(Users);

  Users.associate = models => {
      models.Users.hasMany(models.Products, {
          onDelete: "CASCADE"
      });
  };

  return Users;
};