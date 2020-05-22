// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("Schedule", {
    gameName: {
      type: DataTypes.STRING,
      defaultValue: "Squad",
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

  Schedule.associate = function(models) {
    Schedule.belongsToMany(models.User, {
      through: "UserSchedule",
    });
  };

  return Schedule;
};
