module.exports = function(sequelize, DataTypes) {
  var Deploy = sequelize.define("Deploy", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });

  Deploy.associate = function(models) {
    // We're saying that a Deploy should belong to an User
    // A Deploy can't be created without an User due to the foreign key constraint
    Deploy.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Deploy;
};
