// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
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

    Availability.associate = function (models) {
        Availability.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Schedule;
};
