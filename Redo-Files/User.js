// const md5 = require('md5');
// const passportLocalSequelize = require('passport-local-sequelize');
// const sequelizeTransforms = require('sequelize-transforms');
// const LocalStrategy = require('passport-local').Strategy;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User',  {
//     email: {
//       type: DataTypes.String,
//       unique: true,
//       // lowercase: true,
//       // trim: true,
//       validate: {
//         isEmail: true
//       }
//       // required: true
//     },
//     name: {
//       type: DataTypes.STRING
//       // required: true
//       // trim: true
//     }
//   });


//   sequelizeTransforms(User);

//   User.createStrategy = function () {
//     return new LocalStrategy(options, this.authenticate());
//   };


//   passportLocalSequelize.attachToUser(User, {
//     usernameField: 'name'
//   });



//   // User.associate = models => {
//   // 	models.User.hasMany(models.Products, {
//   // 		onDelete: 'CASCADE'
//   // 	});
//   // };
  
  
// };
