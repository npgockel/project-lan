// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
    var Availability = sequelize.define("Availability", {
        user: {
            type: 
        },
        start_time: {
            type: DataTypes.DATETIME,
        },
        end_time: {
            type: DataTypes.DATETIME,
        }
    });
    Availability.associate = function (models) {
        Availability.belongsTo(models.User, models.Schedule, {
            foreignKey: {
                allowNull: false
            }
        })

    };
    return Availability;
};
