

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.String
    },
    name: {
      type: DataTypes.String
    }
  });
  return User;
};
