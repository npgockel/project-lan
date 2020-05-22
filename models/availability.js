// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define("Availability", {
    select_date: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.STRING,
    },
    end_time: {
      type: DataTypes.STRING,
    },
  });
  Availability.associate = function(models) {
    Availability.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Availability.belongsTo(models.Schedule, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  // Availability.associate = function(models) {
  //   Availability.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: true,
  //     },
  //     as: "Partner",
  //   });
  // };

  return Availability;
};
