// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function(sequelize, DataTypes) {
  var Timeblocks = sequelize.define("Timeblocks", {
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
  Timeblocks.associate = function(models) {
    Timeblocks.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Timeblocks;
};
