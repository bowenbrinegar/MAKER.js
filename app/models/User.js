
const sequelizeTransforms = require('sequelize-transforms');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  sequelizeTransforms(User);

  return User;
};