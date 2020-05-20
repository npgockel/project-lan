// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define("Availability", {
    gameName: {
      type: DataTypes.STRING,
    },
    selected_date: {
      type: DataTypes.DATE,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
  });

  Availability.associate = function(models) {
    Availability.belongsToMany(models.User, {
      through: "User_Schedule",
    });
  };

  return Availability;
};
