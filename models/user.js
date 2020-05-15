// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0001.29
    steam_ID: {
      type: DataTypes.STRING
    },
    steam_name: {
      type: DataTypes.STRING
    },
    steam_group: {
      type: DataTypes.STRING
    },
    discord_invite: {
      type: DataTypes.STRING
    },
  });
  User.hasMany(Time_block);


  User.associate = function (models) {
    User.hasMany(models.Schedule, models.Availability, {
      onDelete: "cascade"
    });
  };





  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
