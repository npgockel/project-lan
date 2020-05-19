// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function(sequelize, DataTypes) {
  var Timeblock = sequelize.define("Timeblock", {
    select_date: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
  });
  Timeblock.associate = function(models) {
    Timeblock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Timeblock;
};
