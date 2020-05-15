// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
    var Time_block = sequelize.define("Time_block", {
        user: {
            type: DataTypes.FOREIGNKEY
        },
        start_time: {
            type: DataTypes.DATETIME,
        },
        end_time: {
            type: DataTypes.DATETIME,
        }
    });
    Time_block.associate = function (models) {
        Time_block.belongsTo(models.Availablity, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Time_block;
};
